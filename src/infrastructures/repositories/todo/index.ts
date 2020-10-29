import { decorate, injectable } from "inversify";
import { SQLTodoRepository } from "./todo";

decorate(injectable(), SQLTodoRepository);

export { SQLTodoRepository };
