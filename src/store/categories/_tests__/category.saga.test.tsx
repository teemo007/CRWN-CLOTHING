import { testSaga, expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from "../category.saga";
import { CATEGORIES_ACTION_TYPE } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import {
  fetchCateGoriesFailed,
  fetchCateGoriesSuccess,
} from "../category.action";
import { throwError } from "redux-saga-test-plan/providers";

describe("category sagas", () => {
  test("categoriesSaga", () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });
  test("onFetchCategories", () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });
  test("fetchCategoriesAsync success", () => {
    const mockCategoriesArray = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];
    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
      .put(fetchCateGoriesSuccess(mockCategoriesArray))
      .run();
  });
  test("fetchCategoriesAsync failure", () => {
    const mockError = new Error("An error Occurred");
    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
      .put(fetchCateGoriesFailed(mockError))
      .run();
  });
});
