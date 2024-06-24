import { useEffect } from "react";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { setCategories } from "../../store/categories/category.action.js";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Category from "../category/category.component.jsx";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');

      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
