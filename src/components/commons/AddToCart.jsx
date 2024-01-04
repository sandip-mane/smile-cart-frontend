import { TooltipWrapper } from "components/commons";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ availableQuantity, slug }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleAdd = e => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return (
      <TooltipWrapper
        content="Product unavailable"
        position="top"
        showTooltip={availableQuantity === 0}
      >
        <Button
          disabled={availableQuantity === 0}
          label="Add to cart"
          size="large"
          onClick={handleAdd}
        />
      </TooltipWrapper>
    );
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
