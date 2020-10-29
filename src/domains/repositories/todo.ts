import { Todo } from "../entities/todo";

export interface TodoRepository {
  create(todo: Omit<Todo, "id">): Promise<number>;
  getById(id: number): Promise<Todo | undefined>;
  getList(): Promise<Todo[]>;
  update(todo: Todo): Promise<number>;
  deleteById(id: number): Promise<Todo>;
}
