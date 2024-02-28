import { hash } from "https://deno.land/x/scrypt@v4.3.1/mod.ts";
import { db } from "../config/client.ts";
import { User } from "../model/model.ts";
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "../web/requests.ts";

export const createUser = async (body: RegisterRequest) => {
    await User.create({
        username: body.full_name, 
        full_name: body.full_name, 
        phone_number: body.phone_number, 
        roles: body.roles, 
        email: body.email, 
        password: hash(body.password)
    });

    return db.close();
}

export const verifyUser = async (body: LoginRequest) => {
    await User.select(
            "username", 
            "password"
        )
        .where(
            "username", '=', body.username
        )
        .first();
    return db.close();
}

export const selectUser = async (username: string) => {
    await User.select(
            "full_name", 
            "phone_number", 
            "password"
        )
        .where(
            "username", '=', username
        )
        .first();
    return db.close();
}

export const updateUser = async (body: UpdateUserRequest, username: string) => {
    await User.where(
            "username", '=', username
        )
        .update({
            full_name: body.full_name, 
            phone_number: body.phone_number, 
            password: hash(body.password)
        });
    return db.close();
}