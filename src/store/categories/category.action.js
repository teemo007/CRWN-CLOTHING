import { createAction } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPE } from "./category.types"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"


export const fetchCateGoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)
export const fetchCateGoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,categoriesArray)
export const fetchCateGoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCateGoriesStart());
    try {
        const categoruesArry = await getCategoriesAndDocuments('categories');
        dispatch( fetchCateGoriesSuccess(categoruesArry))
    } catch (error) {
        dispatch(fetchCateGoriesFailed(error))
    }
}