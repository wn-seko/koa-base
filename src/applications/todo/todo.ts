import createError from "http-errors";
import { Todo } from "../../domains/entities/todo";
import { TodoRepository } from "../../domains/repositories/todo";

export class TodoApplication {
  private readonly todoRepository: TodoRepository;

  public constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  public async createTodo(
    title: string,
    memo: string,
    done = false,
  ): Promise<number> {
    const todo: Omit<Todo, "id"> = { title, memo, done };
    return await this.todoRepository.create(todo);
  }

  public async listTodos(): Promise<Todo[]> {
    return await this.todoRepository.getList();
  }

  public async getTodo(id: string): Promise<Todo | undefined> {
    return await this.todoRepository.getById(parseInt(id));
  }

  public async updateTodo(
    id: string,
    title?: string,
    memo?: string,
    done?: boolean,
  ): Promise<number> {
    const todo = await this.todoRepository.getById(parseInt(id));

    if (!todo) {
      throw createError(404, `todo is not found. ID: ${id}`);
    }

    const updatedTodo = {
      id: parseInt(id),
      title: title || todo.title,
      memo: memo || todo.memo,
      done: done ?? todo.done,
    };

    return await this.todoRepository.update(updatedTodo);
  }

  public async deleteTodo(id: string): Promise<Todo> {
    return await this.todoRepository.deleteById(parseInt(id));
  }
}
