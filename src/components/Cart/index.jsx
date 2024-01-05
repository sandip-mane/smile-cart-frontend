import { Header, PageLoader } from "components/commons";
import { MRP, OFFER_PRICE } from "components/constants";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { NoData } from "neetoui";
import { keys, isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const { t } = useTranslation();

  const { cartItems } = useCartItemsStore.pick();
  const slugs = keys(cartItems);
  const { data: products = [], isLoading } = useFetchCartProducts(slugs);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

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

export default withTitle(Cart, i18n.t("cart.title"));
