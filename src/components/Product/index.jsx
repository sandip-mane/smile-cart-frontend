import { useState, useEffect } from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import productsApi from "apis/products";
import {
  Header,
  PageLoader,
  PageNotFound,
  AddToCart,
} from "components/commons";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { append, isNotNil } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch (error) {
      console.log(t("error.generic", { error }));
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrl,
    imageUrls,
    availableQuantity,
  } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) return <PageLoader />;

  if (isError) return <PageNotFound />;

  return (
    <div className="px-6 pb-6">
      <Header shouldShowBackButton title={name} />
      <div className="mt-6 flex gap-4">
        <div className="flex w-2/5 flex-col items-center">
          {isNotNil(imageUrls) ? (
            <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>{t("product.mrp", { mrp })}</Typography>
          <Typography weight="semibold">
            {t("product.offerPrice", { offerPrice })}
          </Typography>
          <Typography className="text-green-600" weight="semibold">
            {t("product.off", { percent: discountPercentage })}
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label={t("buyNow")}
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
