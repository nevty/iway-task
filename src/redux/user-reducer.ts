import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {LoginDataType, InferActionTypes} from "../types/types";
import {usersAPI} from "../api/api";
import {AppStateType} from "./store";

const initialState = {
    isAuth: false as boolean,
    isFetching: false as boolean
}

export type initialStateType = typeof initialState;
enum ActionTypeEnum {
    setAuth="login-reducer/SET_LOGIN_AUTH",
    setIsFetching="login-reducer/SET_IS_FETCHING"
}
const userReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case ActionTypeEnum.setAuth:
            return {
                ...state,
                isAuth: action.boolean,
            }
        case ActionTypeEnum.setIsFetching:
            return {
                ...state,
                isFetching: action.boolean
            }
        default:
            return state;
    }
};

export const userActions = {
    setAuth: (boolean: boolean) => ({type: ActionTypeEnum.setAuth, boolean} as const),
    setIsFetching: (boolean:boolean)=>({type: ActionTypeEnum.setIsFetching,boolean} as const)
};

export type ActionTypes = InferActionTypes<typeof userActions>
// Определяем payload и тип акшенов внутри userActions
export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export type ThinkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>

export const loginRequest = (reqData: LoginDataType): ThunkType => (dispatch: ThinkDispatchType) => {
    dispatch(userActions.setIsFetching(true));
    return usersAPI.login(reqData)
        .then((response) => {
            sessionStorage.setItem('Authorization', `bearer ${response.result && response.result.token}`);
            dispatch(userActions.setAuth(true));
            dispatch(userActions.setIsFetching(false));
            return response
        }, error => {
            dispatch(userActions.setIsFetching(false));
            return error.response
        })
}

export default userReducer