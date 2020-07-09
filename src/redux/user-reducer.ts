import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoginDataType, InferActionTypes} from "../types/types";
import {usersAPI} from "../api/api";
import {AppStateType} from "./store";

const initialState = {
    isAuth: false as boolean,
}

export type initialStateType = typeof initialState;

const userReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "login-reducer/SET_LOGIN_AUTH":
            return {
                ...state,
                isAuth: action.boolean,
            }
        default:
            return state;
    }
};

export const userActions = {
    setAuth: (boolean: boolean) => ({type: "login-reducer/SET_LOGIN_AUTH", boolean} as const),
};

export type ActionTypes = InferActionTypes<typeof userActions>
// Определяем payload и тип акшенов внутри userActions
export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export type ThinkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>

export const loginRequest = (reqData: LoginDataType): ThunkType => (dispatch: ThinkDispatchType) => {
    return usersAPI.login(reqData)
        .then((response) => {
            sessionStorage.setItem('Authorization', `bearer ${response.data.result && response.data.result.token}`);
            dispatch(userActions.setAuth(true));
            return response.data
        }, error => error.response.data)
}

export default userReducer