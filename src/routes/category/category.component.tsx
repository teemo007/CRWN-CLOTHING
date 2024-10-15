import { useParams,  } from "react-router-dom";
import { CategoryContainer, CategoryTitle } from "./category.styles.tsx";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/ProductCard.jsx";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector.js";
import Spinner from "../../components/spinner/spinner.component.jsx";

type CategoryRouteParams = {
  category: string;
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;

  const categoriesMap = useSelector(selectCategoriesMap);

  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;
