import { Context } from "https://deno.land/x/oak@v14.0.0/mod.ts";

export function webResponse<Type>(ctx: Context, status: number, message: string, data: Type) {
    ctx.response.status = status;
    return ctx.response.body = JSON.stringify({message: message, data: data})
}