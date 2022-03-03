import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PaymentStatus } from 'App/Enums/payment-status'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned()
      table.integer('reseller_id').unsigned().nullable()
      table.string('expedition').nullable()
      table.string('tracking_number').nullable()
      table.double('shipping_cost').defaultTo(0)
      table.string('city_id')
      table.string('address')
      table.string('postal_code')
      table.string('name')
      table.string('vac')
      table.string('bank')
      table
        .enum('status', [
          PaymentStatus.WAIT_FOR_PAYMENT,
          PaymentStatus.PAYMENT_CONFIRMED,
          PaymentStatus.SENDING,
          PaymentStatus.RETUR,
          PaymentStatus.RECEIVED_TO_CUSTOMER,
          PaymentStatus.COMPLETED,
        ])
        .defaultTo(PaymentStatus.WAIT_FOR_PAYMENT)
      table.float('total')
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
