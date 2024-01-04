import { Header } from "components/commons";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t } = useTranslation();

  return <Header shouldShowBackButton title={t("checkout.title")} />;
};

export default Checkout;
