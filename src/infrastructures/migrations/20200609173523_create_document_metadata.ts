import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_metadata", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料メタデータ");
    t.integer("document_id").primary().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.text("original_file_name").notNullable().defaultTo("").comment("アップロードファイル名");
    t.text("original_extension").notNullable().defaultTo("").comment("アップロードファイル拡張子");
    t.text("thumbnail_file_name").notNullable().defaultTo("").comment("サムネイル画像ファイル名");
    t.text("file_path").notNullable().defaultTo("").comment("ファイルの実体格納パス");
    t.integer("file_size").notNullable().defaultTo(0).comment("ファイルサイズ");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    t.dateTime("updated_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("更新日時");
    t.dateTime("deleted_at", { useTz: true }).notNullable().defaultTo("infinity").comment("削除日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_metadata");
};
