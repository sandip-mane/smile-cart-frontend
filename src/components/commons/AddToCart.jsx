import { TooltipWrapper } from "components/commons";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";
import { useTranslation } from "react-i18next";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ availableQuantity, slug }) => {
  const { t } = useTranslation();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleAdd = e => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedQuantity(1);
  };

  if (isNil(selectedQuantity)) {
    return (
      <TooltipWrapper
        content={t("error.unavailable")}
        position="top"
        showTooltip={availableQuantity === 0}
      >
        <Button
          disabled={availableQuantity === 0}
          label={t("product.addToCart")}
          size="large"
          onClick={handleAdd}
        />
      </TooltipWrapper>
    );
  }

  return <ProductQuantity {...{ availableQuantity, slug }} />;
};

export default AddToCart;
