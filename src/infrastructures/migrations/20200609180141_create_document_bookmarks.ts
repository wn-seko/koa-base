import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_bookmarks", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料ブックマーク");
    t.increments("id").primary().comment("資料ブックマークID");
    t.integer("staff_id").notNullable().index().comment("スタッフID");
    t.integer("document_id").notNullable().index().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.integer("sequence").notNullable().defaultTo(0).index().comment("並び順");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    t.dateTime("updated_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("更新日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_bookmarks");
};
