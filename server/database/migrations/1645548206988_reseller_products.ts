import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class ResellerProducts extends BaseSchema {
  protected tableName = 'reseller_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.integer('reseller_id').unsigned()
      table.integer('product_id').unsigned()
      table.integer('stock').unsigned()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamps(true,true);

      relationHelper(table, {
        key: 'reseller_id',
        on: "resellers"
      })
      relationHelper(table, {
        key: 'product_id',
        on: "products"
      })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
