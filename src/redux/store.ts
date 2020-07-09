import {applyMiddleware, combineReducers, createStore} from "redux";
import ThunkMiddleWare from "redux-thunk";
import userReducer from "./user-reducer";

let rootReducer = combineReducers({
    userState: userReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer,applyMiddleware(ThunkMiddleWare));

export default store