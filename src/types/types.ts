export enum ErrorCodeEnum {
    wrongAuthStatus = 400
}

export type LoginDataType = {
    login: string
    password: string
}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>