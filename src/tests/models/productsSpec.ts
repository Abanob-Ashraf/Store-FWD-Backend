import Client from '../../database'
import { ProductsModel } from '../../models/products'

const product = new ProductsModel()

describe('product Model Test', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(product.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(product.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(product.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(product.delete).toBeDefined()
  })

  it('should have a Popular method', () => {
    expect(product.popular).toBeDefined()
  })

  it('test create method ', async () => {
    const productsSpec = await product.create({
      id: undefined as unknown as number,
      title: 'Dell laptop',
      price: 5550,
      description: 'good to use in programming and gaming',
      category: 'laptop'
    })
    expect(productsSpec as unknown).toEqual({
      id: 1,
      title: 'Dell laptop',
      price: 5550,
      description: 'good to use in programming and gaming',
      category: 'laptop'
    })
  })

  it('test show method to show all products', async () => {
    const result = await product.index()
    expect(result as unknown).toEqual([
      {
        id: 1,
        title: 'Dell laptop',
        price: 5550,
        description: 'good to use in programming and gaming',
        category: 'laptop'
      }
    ])
  })

  it('test show method to show the product by category', async () => {
    const result = await product.showByCategory('laptop')
    expect(result as unknown).toEqual([
      {
        id: 1,
        title: 'Dell laptop',
        price: 5550,
        description: 'good to use in programming and gaming',
        category: 'laptop'
      }
    ])
  })

  it('test show method to show the product by id', async () => {
    const result = await product.show(1)
    expect(result as unknown).toEqual({
      id: 1,
      title: 'Dell laptop',
      price: 5550,
      description: 'good to use in programming and gaming',
      category: 'laptop'
    })
  })

  it('test update method to update the product by id', async () => {
    const result = await product.update({
      id: 1,
      title: 'Dell G15 laptop',
      price: 6000,
      description: 'Good to use in Programming and Gaming',
      category: 'Laptop'
    })
    expect(result as unknown).toEqual({
      id: 1,
      title: 'Dell G15 laptop',
      price: 6000,
      description: 'Good to use in Programming and Gaming',
      category: 'Laptop'
    })
  })

  it('test delete method to delete the product by id', async () => {
    await product.delete(1)
    const result = await product.index()
    expect(result).toEqual([])
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    connection.release()
  })
})
