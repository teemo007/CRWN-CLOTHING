import { createContext, useState } from "react";
import shop_data from "../shop-data.json";

export const ProductsContext = createContext({
  products: [],
  setProducts: ()=> null,
});

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(shop_data);
  const value = {products, setProducts}
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
