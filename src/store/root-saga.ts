import { all, call } from "typed-redux-saga";
import { categoriesSaga } from "./categories/category.saga";
import { userSaga } from "./user/user.saga";
import { paymentSaga } from "./payment/payment.saga";

export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga), call(paymentSaga)]);
  }
