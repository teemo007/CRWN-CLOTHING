import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../category.selector";

const mockState = {
  categories: {
    isLoading: false,
    categories: [
      {
        title: "mens",
        imageUrl: "test",
        items: [
          { id: 1, name: "Product 1", imageUrl: "img1", price: 10 },
          { id: 2, name: "Product 2", imageUrl: "img2", price: 20 },
        ],
      },
      {
        title: "womens",
        imageUrl: "test2",
        items: [
          { id: 3, name: "Product 1", imageUrl: "img3", price: 30 },
          { id: 4, name: "Product 2", imageUrl: "img4", price: 40 },
        ],
      },
    ],
  },
};

describe("Category selectors", () => {
  test("selectCategories should return the categoriesData", () => {
    const categoriesSlice = selectCategories(mockState);
    expect(categoriesSlice).toEqual(mockState.categories.categories);
  });
  test("selectCategoriesIsLoading should return isLoading state", () => {
    const isLoading = selectCategoriesIsLoading(mockState);
    expect(isLoading).toEqual(false);
  });
  test("selectCategoriesMap should convert the items array into the appropriate map", () => {
    const expectedCategoriesMap = {
      mens: [
        { id: 1, name: "Product 1", imageUrl: "img1", price: 10 },
        { id: 2, name: "Product 2", imageUrl: "img2", price: 20 },
      ],
      womens: [
        { id: 3, name: "Product 1", imageUrl: "img3", price: 30 },
        { id: 4, name: "Product 2", imageUrl: "img4", price: 40 },
      ],
    };
    const categpriesMap = selectCategoriesMap(mockState);
    expect(categpriesMap).toEqual(expectedCategoriesMap)
  });
});
