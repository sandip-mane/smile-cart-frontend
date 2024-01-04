import { sum } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

export const cartTotalOf = (products, key) => {
  const { cartItems } = useCartItemsStore.getState();

  return sum(products.map(product => product[key] * cartItems[product.slug]));
};
