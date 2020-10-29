import * as Knex from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable("document_file_approval", (t) => {
    /* eslint-disable prettier/prettier */
    t.comment("資料申請");
    t.increments("id").primary().comment("資料申請ID");
    t.integer("document_id").notNullable().index().references("documents.id").onDelete("RESTRICT").onUpdate("RESTRICT").comment("資料ID");
    t.integer("approvers_staff_id").notNullable().index().comment("承認者スタッフID");
    t.text("applicants_comment").notNullable().defaultTo("").comment("申請者コメント");
    t.text("approvers_comment").notNullable().defaultTo("").comment("承認者コメント");
    t.dateTime("approved_at", { useTz: true }).notNullable().defaultTo("infinity").comment("承認日時");
    t.dateTime("rejected_at", { useTz: true }).notNullable().defaultTo("infinity").comment("却下日時");
    t.dateTime("created_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("作成日時");
    t.dateTime("updated_at", { useTz: true }).notNullable().defaultTo(knex.raw("now()")).comment("更新日時");
    t.dateTime("deleted_at", { useTz: true }).notNullable().defaultTo("infinity").comment("削除日時");
    /* eslint-enable */
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable("document_file_approval");
};
