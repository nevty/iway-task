import axios from "axios"
import {ErrorCodeEnum, LoginDataType, TripType} from "../types/types";
import {GetTokenType} from "../utils/localStorage";

const baseURL = 'https://cors-anywhere.herokuapp.com/http://transstage1.iwayex.com/transnextgen';

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
    result?: { token: string },
    error?: {
        name: string,
        message: string,
        code: number,
        status: ErrorCodeEnum,
        type: string
    }
}

export const tripsAPI = {
    getTrips(token:ReturnType<GetTokenType>,page:number) {
        return instance.get<GetTripsResponseType>(`v3/orders/trips?page=${page}`,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.data)
    }
}

export type GetTripsResponseType = {
    result?: {
        orders: Array<TripType>,
        page_data: PageDataType
    },
    error?: {
        name: string,
        message: string,
        code: number,
        status: ErrorCodeEnum,
        type: string
    }
}


export type PageDataType = {
    page: number,
    items_on_page: number,
    total_items: number,
    page_count: number
}