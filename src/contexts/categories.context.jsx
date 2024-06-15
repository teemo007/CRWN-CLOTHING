import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategoriesMap: ()=> null,
});

export const CategoriessProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(()=>{
  //   addCollectionAndDocuments('categories',SHOP_DATA)
  // },[])
  useEffect(()=>{
    const getCategoriesMap = async()=>{
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap();
  },[])
  const value = {categoriesMap, setCategoriesMap}
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
