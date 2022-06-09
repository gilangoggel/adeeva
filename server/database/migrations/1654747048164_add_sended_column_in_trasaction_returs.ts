import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionReturs extends BaseSchema {
  protected tableName = 'transaction_returs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean(
        'has_resended'
      ).defaultTo(false).after('accepted')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('has_resended')
    })
  }
}
