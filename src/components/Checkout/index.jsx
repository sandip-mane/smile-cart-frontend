import { Header } from "components/commons";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

const Checkout = () => {
  const { t } = useTranslation();

  return <Header shouldShowBackButton title={t("checkout.title")} />;
};

export default withTitle(Checkout, i18n.t("checkout.title"));
