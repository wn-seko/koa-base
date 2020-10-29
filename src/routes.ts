import Router from "@koa/router";
import Koa from "koa";
import * as rootApi from "./api/root";
import * as todoApi from "./api/todo";

const rootRouter = new Router();

rootRouter.get("/", rootApi.healthCheck);

const todoRouter = new Router({ prefix: "/todos" });

todoRouter
  .get("/", todoApi.listTodos)
  .get("/:id", todoApi.getTodo)
  .post("/", todoApi.createTodo)
  .put("/:id", todoApi.updateTodo)
  .delete("/:id", todoApi.deleteTodo);

const routerList = [rootRouter, todoRouter];

export const routers = (app: Koa): void => {
  for (const router of routerList) {
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
};
