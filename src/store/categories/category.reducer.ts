import { Category } from "./category.types";
import {
  fetchCateGoriesStart,
  fetchCateGoriesSuccess,
  fetchCateGoriesFailed,
} from "./category.action";
import { UnknownAction } from "redux";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = INITIAL_STATE,
  action = {} as UnknownAction
): CategoriesState => {
  if (fetchCateGoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchCateGoriesSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      categories: action.payload,
    };
  }
  if (fetchCateGoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  return state;
};
