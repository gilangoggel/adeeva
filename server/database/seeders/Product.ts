import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'
import 'minifaker/locales/en' // the first locale import is set as default
import { createReadStream } from 'fs'
import * as path from 'path'
import Reader from 'csv-reader'
import AutoDetectDecoderStream from 'autodetect-decoder-stream'

export default class ProductSeeder extends BaseSeeder {
  private getData(): Promise<any[]> {
    return new Promise((resolve) => {
      const rs = createReadStream(path.resolve(__dirname + '/product-data/product.csv'))
      const data = [] as any[]
      rs.pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' }))
        .pipe(new Reader({ parseNumbers: true, parseBooleans: true }))
        .on('data', (row: any) => {
          const next = data.length + 1
          data.push({
            id: next,
            category: row[0] === 'Makanan' ? 'FNB' : 'SKINCARE',
            name: row[1],
            resellerPrice: row[2],
            price: row[3],
            description: row[4],
            image: `/uploads/product/${next}${next < 11 ? '.png' : '.jpg'}`,
            pax: 5,
          })
        })
        .on('end', () => resolve(data))
    })
  }

  public async run() {
    const data = await this.getData()
    await Product.query().delete()
    await Product.createMany(data)
    console.log(data, data.length)
    // const inputs = Array.from({
    //   length: 15,
    // })
    //   .map(
    //     () =>
    //       ({
    //         name: faker.name(),
    //         price: 40000,
    //         resellerPrice: 35000,
    //         pax: 5,
    //         category: faker.arrayElement(['FNB', 'CLOTES', 'SKINCARE']),
    //         description: lorem,
    //         image: '',
    //       } as any)
    //   )
    //   .map((value) => {
    //     const p = new Product()
    //     console.log(value)
    //     p.fill(value)
    //     return p
    //   })
    //
    // const promise = Promise.all(inputs.map((a) => a.save()))
    // await promise
  }
}
