import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({
        searchTerm: debouncedSearchTerm,
      });
      setProducts(products);
    } catch (error) {
      console.log(t("error.generic", { error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="px-6 pb-6">
      <Header
        title={t("title")}
        actionBlock={
          <Input
            placeholder={t("searchProducts")}
            prefix={<Search />}
            type="search"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        }
      />
      <div className="flex h-screen flex-col">
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title={t("noData")} />
        ) : (
          <div className="grid grid-cols-4 gap-4 p-4">
            {products.map(product => (
              <ProductListItem key={product.slug} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default withTitle(ProductList);
