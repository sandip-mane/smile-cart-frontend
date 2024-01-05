import { useFormikContext } from "formik";
import {
  useFetchCountries,
  useFetchStates,
} from "hooks/reactQuery/useCheckoutApi";
import { Typography } from "neetoui";
import { Input, Select } from "neetoui/formik";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation();
  const {
    setFieldValue,
    values: { country },
  } = useFormikContext();

  const { data: countries = [] } = useFetchCountries();
  const { data: states = [] } = useFetchStates({
    countryCode: country.code,
  });

  const handleChangeCountry = country => {
    setFieldValue("country", country);
    setFieldValue("state", null);
  };

  return (
    <>
      <Typography style="h3" weight="semibold">
        {t("checkout.form.contact")}
      </Typography>
      <Input
        required
        label={t("checkout.form.email")}
        name="email"
        placeholder={t("checkout.form.enterYourEmail")}
        size="large"
      />
      <Typography className="pt-5" style="h3" weight="semibold">
        {t("checkout.form.shippingAddress")}
      </Typography>
      <Select
        required
        label={t("checkout.form.country")}
        name="country"
        optionRemapping={{ label: "name", value: "code" }}
        options={countries}
        placeholder={t("checkout.form.selectCountry")}
        size="large"
        value={country}
        onChange={handleChangeCountry}
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("checkout.form.city")}
          name="city"
          placeholder={t("checkout.form.enterCity")}
          size="large"
        />
        <Select
          required
          label={t("checkout.form.state")}
          name="state"
          optionRemapping={{ label: "name", value: "code" }}
          options={states}
          placeholder={t("checkout.form.selectState")}
          size="large"
        />
      </div>
      <div className="flex space-x-2">
        <Input
          required
          label={t("checkout.form.firstName")}
          name="firstName"
          placeholder={t("checkout.form.enterFirstName")}
          size="large"
        />
        <Input
          required
          label={t("checkout.form.lastName")}
          name="lastName"
          placeholder={t("checkout.form.enterLastName")}
          size="large"
        />
      </div>
      <Input
        required
        label={t("checkout.form.address")}
        name="address"
        placeholder={t("checkout.form.enterAddress")}
        size="large"
      />
      <Input
        required
        label={t("checkout.form.apartment")}
        name="apartment"
        placeholder={t("checkout.form.enterApartmentNumber")}
        size="large"
      />
      <div className="flex space-x-2">
        <Input
          required
          label={t("checkout.form.city")}
          name="city"
          placeholder={t("checkout.form.enterCity")}
          size="large"
        />
        <Input
          required
          label={t("checkout.form.zipCode")}
          name="zipCode"
          placeholder={t("checkout.form.enterZipCode")}
          size="large"
          type="number"
        />
      </div>
    </>
  );
};

export default Form;
