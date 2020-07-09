import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoginDataType, InferActionTypes} from "../types/types";
import {usersAPI} from "../api/api";
import {AppStateType} from "./store";

const initialState = {
    isAuth: false as boolean,
    isFetching: false as boolean
}

export type initialStateType = typeof initialState;

const userReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case "login-reducer/SET_LOGIN_AUTH":
            return {
                ...state,
                isAuth: action.boolean,
            }
        case "login-reducer/SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.boolean
            }
        default:
            return state;
    }
};

export const userActions = {
    setAuth: (boolean: boolean) => ({type: "login-reducer/SET_LOGIN_AUTH", boolean} as const),
    setIsFetching: (boolean:boolean)=>({type: "login-reducer/SET_IS_FETCHING",boolean} as const)
};

export type ActionTypes = InferActionTypes<typeof userActions>
// Определяем payload и тип акшенов внутри userActions
export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export type ThinkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>

export const loginRequest = (reqData: LoginDataType): ThunkType => (dispatch: ThinkDispatchType) => {
    dispatch(userActions.setIsFetching(true));
    return usersAPI.login(reqData)
        .then((response) => {
            sessionStorage.setItem('Authorization', `bearer ${response.data.result && response.data.result.token}`);
            dispatch(userActions.setAuth(true));
            dispatch(userActions.setIsFetching(false));
            return response.data
        }, error => {
            dispatch(userActions.setIsFetching(false));
            return error.response.data
        })
}

export default userReducer