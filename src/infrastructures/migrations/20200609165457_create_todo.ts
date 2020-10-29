import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  if (!(await knex.schema.hasTable("todos"))) {
    return knex.schema.createTable("todos", (t) => {
      t.increments("id").primary();
      t.string("title", 100);
      t.string("memo", 1000);
      t.boolean("done");
    });
  } else {
    console.warn("todo is exists.");
  }
};

export const down = async (knex: Knex): Promise<void> => {
  if (await knex.schema.hasTable("todos")) {
    return knex.schema.dropTable("todos");
  }
};
