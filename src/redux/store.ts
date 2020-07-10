import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleWare from "redux-thunk";
import userReducer from "./user-reducer";
import tripsReducer from "./trips-reducer";

let rootReducer = combineReducers({
    userState: userReducer,
    tripsState: tripsReducer,
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer,applyMiddleware(ThunkMiddleWare));

export default store