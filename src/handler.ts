import { Middleware, Context, Next } from "koa";
import { ApplicationError } from "./applications/errors";
import { env } from "./env";

export const handler = (): Middleware => {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.throw(new ApplicationError(404, { code: "notfound" }));
      }
    } catch (err) {
      const appError =
        err instanceof ApplicationError
          ? err
          : new ApplicationError(500, { code: "unknown" }, err);
      const debug = env.DEBUG_RESPONSE_ENABLED
        ? {
            trace: appError.stack,
            innerError: appError.innerError
              ? {
                  message: appError.innerError?.message,
                  trace: appError.innerError?.stack,
                }
              : undefined,
          }
        : undefined;

      ctx.status = appError.status;
      ctx.body = {
        payload: null,
        error: {
          code: appError.code,
          params: appError.params,
        },
        debug,
      };
    }
  };
};
