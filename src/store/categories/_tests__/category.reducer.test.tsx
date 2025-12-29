import { categoriesReducer, INITIAL_STATE } from "../category.reducer";
import {
  fetchCateGoriesStart,
  fetchCateGoriesSuccess,
  fetchCateGoriesFailed,
} from "../category.action";

describe("Category Reducer tests", () => {
  test("fetchCategoriesStart", () => {
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    expect(categoriesReducer(INITIAL_STATE, fetchCateGoriesStart())).toEqual(
      expectedState
    );
  });
  test("fetchCategoriesSuccess", () => {
    const mockData = [
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
    ];
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    };
    expect(
      categoriesReducer(INITIAL_STATE, fetchCateGoriesSuccess(mockData))
    ).toEqual(expectedState);
  });
  test("fetchCategoriesFailed", () => {
    const mockError = new Error('Error fetching categories');
    const expectState = {
        ...INITIAL_STATE,
        isLoading: false,
        error: mockError
    }

    expect(categoriesReducer(INITIAL_STATE, fetchCateGoriesFailed(mockError))).toEqual(expectState)
  })
});
