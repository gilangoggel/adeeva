import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import {relationHelper} from "App/Utiities/relation-helper";

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.dropTableIfExists(this.tableName);
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('product_id').unsigned();
      table.integer('user_id').nullable().unsigned()
      table.string('username');
      table.text('content');
      table.integer('rating');
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      relationHelper(table, {
        on: "products",
        key: "product_id",
      })
      relationHelper(table, {
        on: "users",
        key: "user_id",
      })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
