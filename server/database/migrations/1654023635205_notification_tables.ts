import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NotificationTables extends BaseSchema {
  protected tableName = 'notifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("user_id");
      table.text("text");
      table.boolean("readed").defaultTo(false);
      table.text("action_link").defaultTo("");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
