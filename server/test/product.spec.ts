/**
 * Pengujian crud product
 */

import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/administration`

test('Pengujian menambahkan produk', async (assert) => {
  const input = {
    name: 'product test',
    price: 40000,
    resellerPrice: 40000,
    description: 'testing description',
    pax: 1,
  }
  const response = await supertest(BASE_URL).post('/product').send(input)
  assert.containsAllKeys(response.body, ['payload'])
})
test('Pengujian mengupdate produk', async (assert) => {
  const input = {
    name: 'product test update',
    price: 40000,
    resellerPrice: 40000,
    description: 'testing description',
    pax: 1,
  }
  const { body } = await supertest(BASE_URL).post('/product').send(input)
  const { id } = body.payload
  const response = await supertest(BASE_URL).post(`/product/${id}`)
  assert.containsAllKeys(response.body, ['payload'])
})
