import { Todo } from "../../../domains/entities/todo";
import { TodoRepository } from "../../../domains/repositories/todo";
import { knex } from "../../database";

export class SQLTodoRepository implements TodoRepository {
  async create(todo: Omit<Todo, "id">): Promise<number> {
    return await knex<Todo>("todos").insert(todo);
  }

  async getById(id: number): Promise<Todo | undefined> {
    return await knex<Todo>("todos").where({ id }).first("*");
  }

  async getList(): Promise<Todo[]> {
    return await knex<Todo>("todos");
  }

  async update(todo: Todo): Promise<number> {
    return await knex<Todo>("todos").where("id", todo.id).update(todo);
  }

  async deleteById(id: number): Promise<Todo> {
    return await knex<Todo>("todos").where({ id }).del<Todo>();
  }
}
