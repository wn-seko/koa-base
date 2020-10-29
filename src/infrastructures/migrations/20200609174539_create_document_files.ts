import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_files", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料ファイル");
    t.integer("document_id").primary().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.specificType("document_type", "smallint").notNullable().comment("資料の種類（1: PDF, 2: 動画）");
    t.string("url_key", 20).notNullable().defaultTo("").unique().comment("URLに利用するキー");
    t.dateTime("last_used_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("最終利用日時");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    t.dateTime("updated_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("更新日時");
    t.dateTime("deleted_at", { useTz: true }).notNullable().defaultTo("infinity").comment("削除日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_files");
};
