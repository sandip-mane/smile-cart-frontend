import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { NoData, Toastr } from "neetoui";
import { keys, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();
  const slugs = keys(cartItems);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  const fetchCartProducts = async () => {
    try {
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );
      setProducts(responses);

      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("error.removedFromCart", { name }), {
            autoClose: 3000,
          });
        }
      });
    } catch (error) {
      console.log(t("error.generic", { error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Header shouldShowBackButton title={t("cart.title")} />
      {isEmpty(products) ? (
        <div className="flex h-screen items-center justify-center">
          <NoData title={t("cart.empty")} />
        </div>
      ) : (
        <div className="mt-10 flex justify-center space-x-10">
          <div className="w-1/3 space-y-5">
            {products.map(product => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
          {totalMrp > 0 && (
            <div className="w-1/4">
              <PriceCard {...{ totalMrp, totalOfferPrice }} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
