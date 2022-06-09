import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionReturMigrations extends BaseSchema {
  protected tableName = 'transaction_returs'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('transaction_id');
      table.text('reason');
      table.text('tracking_number');
      table.string('expedition');
      table.string('photo');
      table.boolean('accepted').defaultTo(false);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
