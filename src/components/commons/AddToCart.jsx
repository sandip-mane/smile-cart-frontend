import { useContext } from "react";

import { Button } from "neetoui";
import { without } from "ramda";
import CartItemsContext from "src/contexts/CartItemsContext";

const AddToCart = ({ slug }) => {
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const toggleIsInCart = () => {
    setCartItems(prevCartItems =>
      cartItems.includes(slug)
        ? without([slug], prevCartItems)
        : [slug, ...prevCartItems]
    );
  };

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();

    toggleIsInCart();
  };

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
