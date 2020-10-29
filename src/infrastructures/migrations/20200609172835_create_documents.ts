import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("documents", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料");
    t.increments("id").primary().comment("資料ID");
    t.integer("owner_staff_id").notNullable().index().comment("所有者");
    t.text("path").notNullable().defaultTo("").index().comment("経路（階層）");
    t.string("name", 100).notNullable().defaultTo("").comment("資料名");
    t.boolean("is_folder").notNullable().defaultTo(false).comment("フォルダ");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    t.dateTime("updated_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("更新日時");
    t.dateTime("deleted_at", { useTz: true }).notNullable().defaultTo("infinity").comment("削除日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("documents");
};
