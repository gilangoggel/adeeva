import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import faker from 'minifaker'
import Product from 'App/Models/Product'
import 'minifaker/locales/en' // the first locale import is set as default

const lorem =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
  '\n' +
  'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n' +
  '\n'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    const inputs = Array.from({
      length: 15,
    })
      .map(
        () =>
          ({
            name: faker.name(),
            price: 40000,
            resellerPrice: 35000,
            pax: 5,
            category: faker.arrayElement(['FNB', 'CLOTES', 'SKINCARE']),
            description: lorem,
            image: '',
          } as any)
      )
      .map((value) => {
        const p = new Product()
        console.log(value)
        p.fill(value)
        return p
      })

    const promise = Promise.all(inputs.map((a) => a.save()))
    await promise
  }
}
