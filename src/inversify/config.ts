import "reflect-metadata";
import { Container } from "inversify";
import { TodoApplication } from "../applications/todo";
import { TodoRepository } from "../domains/repositories/todo";
import { SQLTodoRepository } from "../infrastructures/repositories/todo";
import { TYPES } from "./types";

export const container = new Container();

// bind to SQL Impl
container.bind<TodoRepository>(TYPES.TodoRepository).to(SQLTodoRepository);

// resolve injection
container.bind<TodoApplication>(TYPES.TodoApplication).to(TodoApplication);
