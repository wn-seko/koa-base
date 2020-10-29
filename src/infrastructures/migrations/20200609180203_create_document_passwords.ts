import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_passwords", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料パスワード");
    t.increments("id").primary().comment("資料パスワードID");
    t.integer("document_id").notNullable().index().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.text("password").notNullable().comment("パスワード");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_passwords");
};
