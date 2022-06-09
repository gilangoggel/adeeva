import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned()
      table.integer('city_id').unsigned()
      table.string('address');
      table.string('phone_number');
      table.string('postal_code');
      table.string('bank').nullable();
      table.string('bank_account').nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      relationHelper(table, {
        key: "user_id",
        on: "users",
      })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
