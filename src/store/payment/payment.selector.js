import { createSelector } from "reselect"; 

const selectPaymentReducer = (state) => state.payment

export const selectPaymentIsProcessingPayment = createSelector(
    [selectPaymentReducer],
    (paymentSlice) => paymentSlice.isProcessingPayment
)