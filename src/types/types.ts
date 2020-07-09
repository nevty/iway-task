export enum ErrorCodeEnum {
    wrongAuthStatus = 400,
    unAuthorizedRequest = 401,
}

export type LoginDataType = {
    login: string
    password: string
}

type Passenger = {
    name: string,
    email: string,
    phone?: string,
    company?: string,
    client_id?: number,
    company_id?: number
}

export type TripType = {
    passengers: Array<Passenger>
    status: number,
    location_address: string,
    destination_address: string,
    duration: number,
    booker_number: string,
    car_data: {
        car_class_id: number,
        car_class: string,
        models: string,
        capacity: number
    },
    price: {
        price_id: number,
        price: number,
        price_subaddress: number
    },
}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// Выводит типы свойств внутри объекта

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
// Выводит типы свойств внутри объекта которая вернула функция