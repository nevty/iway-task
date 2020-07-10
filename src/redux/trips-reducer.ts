import {InferActionTypes, TripType} from "../types/types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";
import {tripsAPI} from "../api/api";
import {getToken, GetTokenType} from "../utils/sessionStorage";

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
    setIsFetching = "trips-reducer/SET_IS_FETCHING"
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
        default:
            return state;
    }
};

export const tripsActions = {
    setTrips: (payload: Array<TripType>) => ({type: ActionTypeEnum.setTrips, payload} as const),
    setIsFetching: (boolean: boolean) => ({type: ActionTypeEnum.setIsFetching, boolean} as const)
}

export type ActionTypes = InferActionTypes<typeof tripsActions>
export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>
export type ThinkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypes>

export const getTripsRequest = (): ThunkType => (dispatch) => {
    dispatch(tripsActions.setIsFetching(true));
    const token: ReturnType<GetTokenType> = getToken();
    return tripsAPI.getTrips(token)
        .then(response => {
            if (response.result && response.result.orders) dispatch(tripsActions.setTrips(response.result.orders));
            dispatch(tripsActions.setIsFetching(false));
            return response
        })
        .catch(error => {
            dispatch(tripsActions.setIsFetching(false));
            if (error.response && error.response.data) return error.response.data
        })
}

export default tripsReducer