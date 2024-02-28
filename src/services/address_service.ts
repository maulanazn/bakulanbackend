import { Context } from "https://deno.land/x/oak@v14.0.0/mod.ts";
import { CreateAddressRequest, UpdateAddressRequest } from "../web/requests.ts"
import {webResponse} from "../web/response.ts";
import { createAddress, getAddressByUserId, getAddressById, updateAddress } from "../repository/address_repository.ts";
import { deleteAddressById } from "../repository/address_repository.ts";
import { deleteAddressByUserId } from "../repository/address_repository.ts";

export const create_address = async (ctx: Context) => {
    const username: string = ctx.params.username;
    const { street, city, postal_code, province, country }: CreateAddressRequest = await ctx.request.body({type: 'json'});
    const data = {street, city, postal_code, province, country}

    await createAddress(data, username);

    return webResponse<undefined>(ctx, 201, "Success", undefined);
}

export const get_address_by_user_id = async (ctx: Context) => {
    const username: string = ctx.params.username;
    
    const results = await getAddressByUserId(username);

    return webResponse<object>(ctx, 200, "Success", results);
}

export const get_address_by_id = async (ctx: Context) => {
    const {username, id}: string&number = ctx.params;
    
    const result = await getAddressById(username, id);

    return webResponse<object>(ctx, 200, "Success", result);
}

export const update_address = async (ctx: Context) => {
    const {username, id}: string&number = ctx.params;
    const { street, city, postal_code, province, country }: UpdateAddressRequest = await ctx.request.body({type: 'json'});

    const data = {
        street: street || result.street, 
        city: city || result.city, 
        postal_code: postal_code || result.postal_code, 
        province: province || result.province, 
        country: country || result.country
    }

    await updateAddress(data, username, id);

    return webResponse<undefined>(ctx, 202, "Success", undefined);
}

export const delete_address = async (ctx: Context) => {
    const {username, id}: string&number = ctx.params;

    if (id !== undefined) {
        await deleteAddressById(id);
    } else {
        await deleteAddressByUserId(username);
    }
    
    return webResponse<undefined>(ctx, 202, "Success", undefined);
}