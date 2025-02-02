import { useRef } from "react";

import { TooltipWrapper } from "components/commons";
import { VALID_COUNT_REGEX } from "components/constants";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { Button, Input, Toastr } from "neetoui";
import { useTranslation } from "react-i18next";

const ProductQuantity = ({ availableQuantity, slug }) => {
  const { t } = useTranslation();
  const countInputRef = useRef(null);

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;

  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSetCount = event => {
    preventNavigation(event);
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      Toastr.error(t("error.availability", { count: availableQuantity }), {
        autoClose: 2000,
      });
      setSelectedQuantity(availableQuantity);
      countInputRef.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded flex items-center border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          preventNavigation(e);
          setSelectedQuantity(parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputRef}
        value={parsedSelectedQuantity}
        onChange={handleSetCount}
        onClick={preventNavigation}
      />
      <TooltipWrapper
        content={t("error.maxUnits")}
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={e => {
            preventNavigation(e);
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
