/**
 * Pengujian transaksi
 */
import test from 'japa'
import supertest from 'supertest'
import { PaymentStatus } from 'App/Enums/payment-status'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1`

test('Pengujian menambahkan transaksi melalui reseller', async (assert) => {
  const response = await supertest(BASE_URL).post('/transaction').send(resellerInput)
  assert.containsAllDeepKeys(response.body, ['vac'])
})
test('Pengujian menambahkan transaksi melalui adeeva', async (assert) => {
  const response = await supertest(BASE_URL).post('/transaction').send(noResellerInput)
  assert.containsAllDeepKeys(response.body, ['vac'])
})
test('Pengujian mengkonfirmasi pembayaran oleh admin', async (assert) => {
  const {
    body: { id },
  } = await supertest(BASE_URL).post(`/transaction`).send(noResellerInput)
  const response = await supertest(BASE_URL).post(`/administration/transaction/${id}`).send({
    status: PaymentStatus.PAYMENT_CONFIRMED,
  })
  assert.equal(response.body.status, PaymentStatus.PAYMENT_CONFIRMED)
})
test('Pengujian menambahkan nomor resi pengiriman pada transaksi', async (assert) => {
  const {
    body: { id },
  } = await supertest(BASE_URL).post(`/transaction`).send(noResellerInput)
  const trackingNumber = '123321'
  const response = await supertest(BASE_URL).post(`/administration/transaction/${id}`).send({
    status: PaymentStatus.SENDING,
    trackingNumber,
  })
  assert.equal(response.body.status, PaymentStatus.SENDING)
  assert.equal(response.body.tracking_number, trackingNumber)
})
test('Pengujian mengirim barang oleh reseller', async (assert) => {
  const {
    body: { id },
  } = await supertest(BASE_URL).post(`/transaction`).send(resellerInput)
  const response = await supertest(BASE_URL).post(`/reseller/transaction/${id}`)
  assert.equal(response.body.status, PaymentStatus.SENDING)
})

const noResellerInput = {
  name: 'tester',
  shippingCost: 8000,
  address: 'jalan tester',
  bank: 'mandiri',
  cityId: '31',
  postalCode: '123',
  expedition: 'jne',
  items: [
    {
      productId: 2,
      amount: 2,
    },
  ],
}
const resellerInput = {
  name: 'tester',
  address: 'jalan tester',
  bank: 'mandiri',
  cityId: '31',
  postalCode: '123',
  resellerId: 1,
  items: [
    {
      productId: 2,
      amount: 2,
    },
  ],
}
