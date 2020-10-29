import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_shares", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料共有");
    t.increments("id").primary().comment("資料共有ID");
    t.integer("document_id").notNullable().index().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.integer("client_id").notNullable().index().comment("クライアントID");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_shares");
};
