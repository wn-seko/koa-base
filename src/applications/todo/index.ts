import { decorate, inject, injectable } from "inversify";
import { TYPES } from "../../inversify/types";
import { TodoApplication } from "./todo";

decorate(inject(TYPES.TodoRepository) as ClassDecorator, TodoApplication, 0);
decorate(injectable(), TodoApplication);

export { TodoApplication };
