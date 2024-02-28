import {Application} from "https://deno.land/x/oak@v14.0.0/mod.ts"
import {user_route, auth_user_route} from "./routes/user_route.ts"
import {address_route} from "./routes/address_route.ts"
import { verifyUser } from "./repository/user_repository.ts";
import { LoginRequest } from "./web/requests.ts";
import { webResponse } from "./web/response.ts";

const app = new Application();
app.use(user_route.routes())
app.use(async (ctx, next) => {
    const authorization = ctx.request.headers.get("Authorization")?.split(" ")[1]

    if (authorization === undefined) {
        ctx.response.status = 401
        return ctx.response.body = JSON.stringify({message: "Not Authorizaed"})
    }

    await next();
})
app.use(async (ctx, next) => {
    const {username, password}: LoginRequest = await ctx.request.body({type: 'json'});
    const valueCheck = await verifyUser(ctx.request.body({type: 'json'}));
    const valueParam = await ctx.params.username;
    
    if ((valueCheck.username !== username || valueCheck.password !== password) || (valueCheck.username !== username && valueCheck.password !== password)) {
      return webResponse<undefined>(ctx, 400, "Bad request, maybe the username or password is not exist", undefined);
    }

    if (valueCheck.username !== valueParam.username) {
      return webResponse<undefined>(ctx, 400, "Bad request, maybe the username is not exist", undefined);
    }

    await next();
})
app.use(auth_user_route.routes())
app.use(address_route.routes())
app.listen({port: 3000})