import Client from '../../database'
import { Order, OrdersModel } from '../../models/orders'
import { OrdersProductsModel } from '../../models/ordersProducts'
import { Product, ProductsModel } from '../../models/products'
import { User, UsersModel } from '../../models/users'

const user = new UsersModel()
const order = new OrdersModel()
const orderProduct = new OrdersProductsModel()
const product = new ProductsModel()

const currentDate = new Date()

const testUser = {
  first_name: 'Abanob',
  last_name: 'Ashraf',
  email: 'abanobashraf74@gmail.com',
  password: '1410A'
}

const testProduct = {
  title: 'iPhone',
  price: 990,
  description: 'Smart Phone',
  category: 'phone'
}

const testOrder = {
  status: 'Active',
  user_id: 1,
  order_time: currentDate
}

describe('OrdersProducts Model Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User)
    await product.create(testProduct as Product)
    await order.create(testOrder as Order)
  })

  it('should have an index method', () => {
    expect(orderProduct.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(orderProduct.showByOrderId).toBeDefined()
  })

  it('should have a create method', () => {
    expect(orderProduct.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(orderProduct.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(orderProduct.delete).toBeDefined()
  })

  it('test create method ', async () => {
    const orderSpec = await orderProduct.create({
      order_id: 1,
      product_id: 1,
      quantity: 10,
      id: undefined as unknown as number
    })
    expect(orderSpec as unknown).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 10
    })
  })

  it('test show method to show all ordersProducts', async () => {
    const result = await orderProduct.index()
    expect(result as unknown).toEqual([
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 10
      }
    ])
  })

  it('test show method to show the ordersProducts by OrderId', async () => {
    const result = await orderProduct.showByOrderId(1)
    expect(result as unknown).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 10
    })
  })

  it('test update method to update the orderProduct by OrderId and ProductId', async () => {
    const result = await orderProduct.update({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 15
    })
    expect(result as unknown).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 15
    })
  })

  it('test show method to show all Popular Products', async () => {
    const result = await product.popular()
    expect(result as unknown).toEqual([
      {
        title: 'iPhone',
        price: 990,
        description: 'Smart Phone',
        category: 'phone'
      }
    ])
  })

  it('test delete method to delete the orderProduct by OrderId', async () => {
    await orderProduct.delete(1)
    const result = await orderProduct.index()
    expect(result).toEqual([])
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query(
      'DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;'
    )
    await connection.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;')

    connection.release()
  })
})
