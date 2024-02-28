import { Router } from "https://deno.land/x/oak@v14.0.0/mod.ts";
import { get_user_by_id, login, register, update_user } from "../services/user_service.ts";

export const user_route = new Router()
    .get("/", (ctx) => ctx.response.body = "Bakulan IKU")
    .post("/register", register)
    .post("/login", login);

export const auth_user_route = new Router()
    .get('/user/:username', get_user_by_id)
    .put('/user/:username', update_user);