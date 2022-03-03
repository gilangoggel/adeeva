import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Resellers extends BaseSchema {
  protected tableName = 'resellers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.string('address')
      table.string('city_id')
      table.string('bank')
      table.string('bank_account')
      table.float('balance').defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
