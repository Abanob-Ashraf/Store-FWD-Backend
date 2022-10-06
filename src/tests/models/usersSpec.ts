import Client from '../../database'
import { Order, OrdersModel } from '../../models/orders'
import { OrdersProducts, OrdersProductsModel } from '../../models/ordersProducts'
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
  password: '12346A'
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

const testOrderBroduct = {
  order_id: 1,
  product_id: 1,
  quantity: 10
}

describe('user Model Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User)
    await product.create(testProduct as Product)
    await order.create(testOrder as Order)
    await orderProduct.create(testOrderBroduct as OrdersProducts)
  })

  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(user.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(user.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(user.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(user.delete).toBeDefined()
  })

  it('test show method to show all users', async () => {
    const result = await user.index()
    expect(result as unknown).toEqual([
      {
        id: 1,
        first_name: 'Abanob',
        last_name: 'Ashraf',
        email: 'abanobashraf74@gmail.com'
      }
    ])
  })

  it('test show method to show the user by id', async () => {
    const result = await user.show(1)
    expect(result as unknown).toEqual({
      id: 1,
      first_name: 'Abanob',
      last_name: 'Ashraf',
      email: 'abanobashraf74@gmail.com',
      data: [
        {
          title: 'iPhone',
          order_time: currentDate
        }
      ]
    })
  })

  it('test update method to update the user by id', async () => {
    const result = await user.update({
      id: 1,
      first_name: 'Abanob',
      last_name: 'bob',
      email: 'abanobashraf74@gmail.com',
      password: '12346A'
    })
    expect(result as unknown).toEqual({
      id: 1,
      first_name: 'Abanob',
      last_name: 'bob',
      email: 'abanobashraf74@gmail.com'
    })
  })

  it('test delete method to delete the user by id', async () => {
    await user.delete(1)
    const result = await user.index()
    expect(result).toEqual([])

    const connection = await Client.connect()
    await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    connection.release()
  })

  it('test create method ', async () => {
    const orderSpec = await user.create(testUser as User)
    expect(orderSpec as unknown).toEqual({
      id: 1,
      first_name: 'Abanob',
      last_name: 'Ashraf',
      email: 'abanobashraf74@gmail.com'
    })
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    await connection.query(
      'DELETE FROM orders_products;\n ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;'
    )
    await connection.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;')

    connection.release()
  })
})
