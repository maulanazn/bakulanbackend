import { Context } from "https://deno.land/x/oak@v14.0.0/mod.ts";
import { LoginRequest, RegisterRequest, UpdateUserRequest } from "../web/requests.ts";
import { hash } from "https://deno.land/x/scrypt@v4.3.1/mod.ts";
import { create } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { key } from "../util/apiKeys.ts";
import { createUser, verifyUser, selectUser, updateUser } from "../repository/user_repository.ts";
import {webResponse} from "../web/response.ts";

export const register = async (ctx: Context) => {
  const {username, full_name, phone_number, roles, email, password}: RegisterRequest = await ctx.request.body({type: 'json'});
  const hashedPassword = hash(password);
  
  const data = {username, full_name, phone_number, roles, email, password: hashedPassword}  

  await createUser(data);

  return webResponse<undefined>(ctx, 201, "Success", undefined);
}

export const login = async (ctx: Context) => {
  const {username, password}: LoginRequest = await ctx.request.body({type: 'json'});
  const data = {username, password}

  const valueCheck = await verifyUser(data);

  const token = await create({ alg: "HS512", typ: "JWT" }, { username: valueCheck.username }, key);

  return webResponse<string>(ctx, 201, "Success", token);
}

export const get_user_by_id = async (ctx: Context) => {
  const username: string = ctx.params.username;

  const {full_name, phone_number, password} = await selectUser(username);

  return webResponse<object>(ctx, 201, "Success", {full_name, phone_number, password});
}

export const update_user = async (ctx: Context) => {
  const {full_name, password, phone_number}: UpdateUserRequest = await ctx.request.body({type: 'json'});
  const username: string = ctx.params.username;

  const data = {full_name, phone_number, password}

  await updateUser(data, username);

  return webResponse<undefined>(ctx, 202, "Success", undefined);
}