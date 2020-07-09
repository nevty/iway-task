import axios from "axios"
import {ErrorCodeEnum, LoginDataType, TripType} from "../types/types";
import {GetTokenType} from "../utils/sessionStorage";

const baseURL = 'http://transstage1.iwayex.com/transnextgen';

const instance = axios.create({
    baseURL
})

export const usersAPI = {
    login(data: LoginDataType) {
        return instance.post<UserLoginResponseType>('v3/auth/login', JSON.stringify(data), {
            headers: {'content-type': 'application/json'}
        })
            .then(response => response.data)
    },
}

export type UserLoginResponseType = {
    result: { token: string } | null,
    error: {
        name: string,
        message: string,
        code: number,
        status: ErrorCodeEnum,
        type: string
    } | null
}

export const tripsAPI = {
    getTrips(token:ReturnType<GetTokenType>) {
        return instance.get<GetTripsResponseType>('v3/orders/trips',{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.data)
    }
}

export type GetTripsResponseType = {
    result: {
        orders: Array<TripType>,
        page_data: {
            page: number,
            items_on_page: number,
            total_items: number,
            page_count: number
        }
    },
    error: {
        name: string,
        message: string,
        code: number,
        status: ErrorCodeEnum,
        type: string
    } | null
}