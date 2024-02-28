import { Router } from "https://deno.land/x/oak@v14.0.0/mod.ts";
import { create_address, delete_address, get_address_by_id, get_address_by_user_id, update_address } from "../services/address_service.ts";

export const address_route = new Router()
    .post("/address/:username", create_address)
    .get("/address/:username", get_address_by_user_id)
    .get("/address/:username/detail/:id", get_address_by_id)
    .put("/address/:username/detail/:id", update_address)
    .delete("/address/:username/detail/:id", delete_address);