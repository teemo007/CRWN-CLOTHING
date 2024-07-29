import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPE {
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
  SET_CART_TOTAL = "cart/SET_CART_TOTAL",
  SET_IS_Item_EDITABLE = "cart/SET_IS_Item_EDITABLE",
}

export type CartItem = CategoryItem & {
  quantity: number;
  id: number;
};

export type SelectedItemEditableState = {
  [id: string]: boolean;
};
