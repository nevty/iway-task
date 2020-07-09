import axios from "axios"
import {ErrorCodeEnum, LoginDataType} from "../types/types";

const baseURL = 'http://transstage1.iwayex.com/transnextgen';

const instance = axios.create({
    baseURL
})

export const usersAPI = {
    login(data: LoginDataType) {
        return instance.post('v3/auth/login', JSON.stringify(data), {
            headers: {'content-type': 'application/json'}
        })
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