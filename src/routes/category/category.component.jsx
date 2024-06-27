import { useParams } from "react-router-dom";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/ProductCard";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector.js";

const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
