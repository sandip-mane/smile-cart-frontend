import axios from "axios";

const PRODUCT_URL =
  "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2";

const show = () => axios.get(PRODUCT_URL);

const productsApi = { show };

export default productsApi;
