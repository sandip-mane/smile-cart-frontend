import { useState } from "react";

import { Header, PageLoader } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);

  const queryParams = {
    searchTerm: debouncedSearchTerm,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(queryParams);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col px-6 pb-6">
      <Header
        title={t("title")}
        actionBlock={
          <Input
            placeholder={t("searchProducts")}
            prefix={<Search />}
            type="search"
            value={searchTerm}
            onChange={event => {
              setCurrentPage(DEFAULT_PAGE_INDEX);
              setSearchTerm(event.target.value);
            }}
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
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={page => setCurrentPage(page)}
          pageNo={currentPage}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default withTitle(ProductList);
