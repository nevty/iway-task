import {InferActionTypes, TripType} from "../types/types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";
import {tripsAPI, PageDataType} from "../api/api";
import {getToken, GetTokenType} from "../utils/localStorage";

const initialState = {
    trips: [] as Array<TripType>,
    page_data: {
        page: 0,
        items_on_page: 0,
        total_items: 0,
        page_count: 0
    },
    isFetching: false
}

export type initialStateType = typeof initialState;

enum ActionTypeEnum {
    setTrips = "trips-reducer/SET_TRIPS",
    setIsFetching = "trips-reducer/SET_IS_FETCHING",
    setPageData = "trips-reducer/SET_PAGE_DATA"
}

const tripsReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case ActionTypeEnum.setTrips:
            return {
                ...state,
                trips: action.payload
            }
        case ActionTypeEnum.setIsFetching:
            return {
                ...state,
                isFetching: action.boolean
            }
        case ActionTypeEnum.setPageData:
            return {
                ...state,
                page_data: action.payload
            }
        default:
            return state;
    }
};

export const tripsActions = {
    setTrips: (payload: Array<TripType>) => ({type: ActionTypeEnum.setTrips, payload} as const),
    setIsFetching: (boolean: boolean) => ({type: ActionTypeEnum.setIsFetching, boolean} as const),
    setPageData: (payload:PageDataType)=>({type:ActionTypeEnum.setPageData,payload} as const)
}

export type ActionTypes = InferActionTypes<typeof tripsActions>
// Определяем payload и тип акшенов внутри tripsActions
export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>

export const getTripsRequest = (page = 1): ThunkType => (dispatch:ThunkDispatchType) => {
    dispatch(tripsActions.setIsFetching(true));
    const token: ReturnType<GetTokenType> = getToken();
    return tripsAPI.getTrips(token,page)
        .then(response => {
            if (response.result && response.result.orders) {
                dispatch(tripsActions.setTrips(response.result.orders));
                dispatch(tripsActions.setPageData(response.result.page_data))
            }
            dispatch(tripsActions.setIsFetching(false));
            return response
        })
        .catch(error => {
            dispatch(tripsActions.setIsFetching(false));
            if (error.response && error.response.data) return error.response.data
        })
}

export default tripsReducer