import Koa from "koa";
import { TodoApplication } from "../../applications/todo";

export class TodoApi {
  private todoService: TodoApplication;

  constructor(todoService: TodoApplication) {
    this.todoService = todoService;
  }

  public async listTodos(ctx: Koa.Context): Promise<void> {
    const todos = await this.todoService.listTodos();
    ctx.body = todos;
  }

  public async getTodo(ctx: Koa.Context): Promise<void> {
    const todo = await this.todoService.getTodo(ctx.params["id"]);
    ctx.body = todo;
  }

  public async createTodo(ctx: Koa.Context): Promise<void> {
    const { title, memo, done } = ctx.request.body;
    this.todoService.createTodo(title, memo, done);
    ctx.status = 201;
  }

  public async updateTodo(ctx: Koa.Context): Promise<void> {
    const { title, memo, done } = ctx.request.body;
    this.todoService.updateTodo(ctx.params["id"], title, memo, done);
    ctx.status = 200;
  }

  public async deleteTodo(ctx: Koa.Context): Promise<void> {
    await this.todoService.deleteTodo(ctx.params["id"]);
    ctx.status = 200;
  }
}
