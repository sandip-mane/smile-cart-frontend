import axios from "axios";

const fetch = () => axios.get("products");
const show = slug => axios.get(`products/${slug}`);

const productsApi = { fetch, show };

export default productsApi;
