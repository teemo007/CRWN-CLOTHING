import {takeLatest, all, call, put} from 'redux-saga/effects'
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCateGoriesSuccess, fetchCateGoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPE } from './category.types';

export function* fetchCategoriesAsync() {
    //the generator is actually the basis for async await. use `yield`
    try { // anywhere you have a fuction and you want to turn it into an effect, you use the `call` keyword
        const categoruesArry = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCateGoriesSuccess(categoruesArry))
        // dispatch( fetchCateGoriesSuccess(categoruesArry))
    } catch (error) {
        yield put(fetchCateGoriesFailed(error))
        // dispatch(fetchCateGoriesFailed(error))
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync) //if you hear a bunch of the same action, give me the latest one.
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]) //essentially an effect that says run everything inside and pnly complete when all of its is done. || Accepts Array 
    // anything here will be pause essentially for this level until everthing on this line following the yield is finished
}