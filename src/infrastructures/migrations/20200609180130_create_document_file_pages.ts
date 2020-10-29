import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_file_pages", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料ページ");
    t.increments("id").primary().comment("資料ページID");
    t.integer("document_id").notNullable().index().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.string("title", 20).notNullable().defaultTo("").comment("ページタイトル");
    t.text("talk_script").notNullable().defaultTo("").comment("トークスクリプト");
    t.text("thumbnail_file_name").notNullable().defaultTo("").comment("サムネイル画像ファイル名");
    t.integer("display_order").notNullable().defaultTo(0).comment("表示順");
    t.integer("page_width").notNullable().defaultTo(0).comment("幅");
    t.integer("page_height").notNullable().defaultTo(0).comment("高さ");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    t.dateTime("updated_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("更新日時");
    t.dateTime("deleted_at", { useTz: true }).notNullable().defaultTo("infinity").comment("削除日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_file_pages");
};
