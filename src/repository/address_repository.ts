import {CreateAddressRequest, UpdateAddressRequest} from '../web/requests.ts';
import {Address} from '../model/model.ts';
import { db } from "../config/client.ts";

export const createAddress = async (body: CreateAddressRequest, username: string) => {
    await Address.create({
        userId: username,
        street: body.street,
        city: body.street,
        postal_code: body.postal_code,
        province: body.street,
        country: body.street,
    });
    return db.close();
}

export const getAddressByUserId = async (username: string) => {
    await Address.select(
            "street",
            "city",
            "postal_code",
            "province",
            "country",
        )  
        .where("username", '=', username)
        .get()
    return db.close();
}

export const getAddressById = async (username: string, id: number) => {
    await Address.select(
            "street",
            "city",
            "postal_code",
            "province",
            "country",
        )  
        .where("id", '=', id)
        .where("username", '=', username)
        .first()
    return db.close();
}

export const updateAddress = async (body: UpdateAddressRequest, username: string, id: number) => {
    await Address.where("username", '=', username)
        .where("id", "=", id)
        .update({
            street: body.street,
            city: body.street,
            postal_code: body.postal_code,
            province: body.street,
            country: body.street,
        });
    return db.close();
}

export const deleteAddressByUserId = async (username: string) => {
    await Address.where("username", '=', username)
        .delete();
    return db.close();
}

export const deleteAddressById = async (id: number) => {
    await Address.deleteById(id);
    return db.close();
}