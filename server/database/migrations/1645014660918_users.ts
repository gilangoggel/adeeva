import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.string('email')
      table.string('name')
      table.string('password')
      table.enum('role', ['ADMINISTRATOR', 'RESELLER', 'USER'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true,true);
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
