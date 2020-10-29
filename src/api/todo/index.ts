import { TodoApplication } from "../../applications/todo";
import { container } from "../../inversify/config";
import { TYPES } from "../../inversify/types";
import { TodoApi } from "./todo";

const todoService = container.get<TodoApplication>(TYPES.TodoApplication);
const api = new TodoApi(todoService);

export const listTodos = api.listTodos.bind(api);
export const getTodo = api.getTodo.bind(api);
export const createTodo = api.createTodo.bind(api);
export const updateTodo = api.updateTodo.bind(api);
export const deleteTodo = api.deleteTodo.bind(api);
