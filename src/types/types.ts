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
    order_id: number,
    passengers: Array<Passenger>
    status: number,
    date_arrival: string,
    date_departure: string,
    location_address: string,
    destination_address: string,
    booker_number: string,
    car_data: {
        car_class_id: number,
        car_class: string,
        models: string,
        capacity: number
    },
    currency: string,
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