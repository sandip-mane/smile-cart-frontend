import { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";
import productsApi from "apis/products";
import {
  Header,
  PageLoader,
  PageNotFound,
  AddToCart,
} from "components/commons";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      setProduct(response);
    } catch (error) {
      console.log("Error", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { name, description, mrp, offerPrice, imageUrl, imageUrls } = product;

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
          <Typography>MRP: {mrp}</Typography>
          <Typography weight="semibold">Offer price: {offerPrice}</Typography>
          <Typography className="text-green-600" weight="semibold">
            {discountPercentage}% off
          </Typography>
          <AddToCart {...{ slug }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
