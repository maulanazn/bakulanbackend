export enum roles {
    BUYER = "BUYER",
    SELLER = "SELLER"
}

export type RegisterRequest = {
    username: string,
    full_name: string,
    phone_number: number,
    roles: roles,
    email: string,
    password: string
}

export type LoginRequest = {
    username: string,
    password: string
}

export type UpdateUserRequest = {
    full_name: string,
    phone_number: number,
    password: string
}

export type CreateAddressRequest = {
    street     : string
    city       : string
    postal_code: string
    province   : string
    country    : string
}

export type UpdateAddressRequest = {
    street     : string
    city       : string
    postal_code: string
    province   : string
    country    : string
}