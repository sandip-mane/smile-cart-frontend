import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch({
        searchTerm: debouncedSearchTerm,
      });
      setProducts(products);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm]);

  const toggleIsInCart = slug => {
    setCartItems(prevCartItems =>
      cartItems.includes(slug)
        ? without([slug], prevCartItems)
        : [slug, ...prevCartItems]
    );
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="px-6 pb-6">
      <Header
        cartItemsCount={cartItems.length}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        }
      />
      <div className="flex h-screen flex-col">
        {isEmpty(products) ? (
          <NoData className="h-full w-full" title="No products to show" />
        ) : (
          <div className="grid grid-cols-4 gap-4 p-4">
            {products.map(product => (
              <ProductListItem
                isInCart={cartItems.includes(product.slug)}
                key={product.slug}
                toggleIsInCart={() => toggleIsInCart(product.slug)}
                {...{ cartItems, ...product }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
