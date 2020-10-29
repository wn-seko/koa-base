import { Context, Next, BaseContext } from "koa";
import { ApplicationError } from "../applications/errors";
import { env } from "../env";
import { handler } from "../handler";

jest.mock("../env", () => ({
  env: {
    DEBUG_RESPONSE_ENABLED: false,
  },
}));

describe("basic", () => {
  const handle = handler();

  test("status:404 throw ApplicationError", async () => {
    const throwMock = jest.fn();
    const ctx: Context = {
      status: 404,
      throw: (throwMock as unknown) as BaseContext["throw"],
    } as Context;
    const next: Next = jest.fn();

    await handle(ctx, next);

    expect(throwMock.mock.calls[0][0]).toBeInstanceOf(ApplicationError);
  });

  test("throw Error to unknown ApplicationError", async () => {
    const ctx: Context = {} as Context;
    const next: Next = async () => {
      throw new Error("foo");
    };

    env.DEBUG_RESPONSE_ENABLED = true;
    await handle(ctx, next);

    expect(ctx.status).toBe(500);
    expect(ctx.body.payload).toBeNull();
    expect(ctx.body.error.code).toBe("unknown");
    expect(ctx.body.debug.innerError.message).toBe("foo");
  });

  test("context body object", async () => {
    const ctx: Context = {} as Context;
    const next: Next = async () => {
      throw new Error("foo");
    };

    await handle(ctx, next);

    expect(ctx.body).toEqual(
      expect.objectContaining({
        payload: null,
        error: {
          code: expect.any(String),
          params: expect.any(Object),
        },
      }),
    );
  });

  test("throw ApplicationError", async () => {
    const ctx: Context = {} as Context;
    const next: Next = async () => {
      throw new ApplicationError(400, { code: "foo", params: { bar: "baz" } });
    };

    await handle(ctx, next);

    expect(ctx.status).toBe(400);
    expect(ctx.body.error.code).toBe("foo");
    expect(ctx.body.error.params).toEqual({ bar: "baz" });
  });

  test("hide debug information at production", async () => {
    const ctx: Context = {} as Context;
    const next: Next = async () => {
      throw new Error("foo");
    };

    env.DEBUG_RESPONSE_ENABLED = false;
    await handle(ctx, next);

    expect(ctx.body).toHaveProperty("debug", undefined);
  });

  test("show debug information at development", async () => {
    const ctx: Context = {} as Context;
    const next: Next = async () => {
      throw new Error("foo");
    };

    env.DEBUG_RESPONSE_ENABLED = true;
    await handle(ctx, next);

    expect(ctx.body.debug).toEqual(
      expect.objectContaining({
        trace: expect.any(String),
        innerError: {
          message: "foo",
          trace: expect.any(String),
        },
      }),
    );
  });
});
