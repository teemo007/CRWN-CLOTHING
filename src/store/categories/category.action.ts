import { Action, ActionWithPayload, createAction } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPE, Category } from "./category.types"
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesFailed | FetchCategoriesSuccess

export const fetchCateGoriesStart = (): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)

export const fetchCateGoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,categoriesArray)

export const fetchCateGoriesFailed = (error: Error): FetchCategoriesFailed => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCateGoriesStart());
//     try {
//         const categoruesArry = await getCategoriesAndDocuments('categories');
//         dispatch( fetchCateGoriesSuccess(categoruesArry))
//     } catch (error) {
//         dispatch(fetchCateGoriesFailed(error))
//     }
// }