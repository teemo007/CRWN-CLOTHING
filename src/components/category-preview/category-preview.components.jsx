import {CategoryPreviewContainer,Preview,Title} from "./category-preview.styles.jsx";

import ProductCard from "../product-card/ProductCard";

const CategoryPreview = ({ title, products }) => {

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products[title].slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
