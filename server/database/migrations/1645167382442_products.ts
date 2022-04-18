import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.string('name')
      table.string('image').nullable()
      table.string('category')
      table.double('price')
      table.double('reseller_price')
      table.text('description')
      table.integer('pax').defaultTo(1)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('deleted_at').nullable()
      table.timestamps(true,true);
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
