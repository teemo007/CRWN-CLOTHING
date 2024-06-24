import { CATEGORIES_ACTION_TYPE } from "./category.types";

const INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

    default:
      return state;
  }
};
