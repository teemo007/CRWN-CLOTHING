import { UnknownAction } from "redux"

type Matchable<AC extends () => UnknownAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: UnknownAction): action is ReturnType<AC>;
}

export type ActionWithPayload<T,P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string, P> (type: T, payload: P): ActionWithPayload<T,P>;

export function createAction<T extends string>(type: T, payload: void):Action<T>;

export function createAction<T extends string, P> (type: T, payload: P) {
    return ({type,payload})
}
