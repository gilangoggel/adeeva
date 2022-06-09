import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class Resellers extends BaseSchema {
  protected tableName = 'resellers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.integer('user_id').unsigned()
      table.string('address')
      table.string('city_id')
      table.string('bank')
      table.string('bank_account')
      table.float('balance').defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true })
      relationHelper(table, {
        on : 'users',
        key: "user_id"
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
