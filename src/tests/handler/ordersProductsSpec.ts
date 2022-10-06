import supertest from 'supertest'
import { User, UsersModel } from '../../models/users'
import { Product, ProductsModel } from '../../models/products'
import { Order, OrdersModel } from '../../models/orders'
import jwt from 'jsonwebtoken'
import app from '../../main'
import Client from '../../database'

const user = new UsersModel()
const product = new ProductsModel()
const order = new OrdersModel()

const request = supertest(app)

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
  category: 'Phone'
}

const testOrder = {
  status: 'Active',
  user_id: 1,
  order_time: currentDate
}

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string)

describe('OrdersProducts Endpoints Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User)
    await product.create(testProduct as Product)
    await order.create(testOrder as Order)
  })

  it('test create ordersproducts', async () => {
    const response = await request.get('/ordersproducts').send({
      order_id: 1,
      product_id: 1,
      quantity: 10
    })
    expect(response.status).toBe(401)
  })

  it('test create ordersproducts with jwt', async () => {
    const response = await request
      .get('/ordersproducts')
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 10
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show all ordersproducts', async () => {
    const response = await request.get('/ordersproducts')
    expect(response.status).toBe(401)
  })

  it('test show all ordersproducts with jwt', async () => {
    const response = await request.get('/ordersproducts').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show ordersproducts by id', async () => {
    const response = await request.get('/ordersproducts/1')
    expect(response.status).toBe(401)
  })

  it('test show ordersproducts by id with jwt', async () => {
    const response = await request.get('/ordersproducts/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test update ordersproducts by id', async () => {
    const response = await request.get('/ordersproducts').send({
      order_id: 1,
      product_id: 1,
      quantity: 15
    })
    expect(response.status).toBe(401)
  })

  it('test update ordersproducts by id with jwt', async () => {
    const response = await request
      .get('/ordersproducts')
      .send({
        order_id: 1,
        product_id: 1,
        quantity: 15
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test delete ordersproducts by orderId', async () => {
    const response = await request.get('/ordersproducts/1')
    expect(response.status).toBe(401)
  })

  it('test delete ordersproducts by orderId with jwt', async () => {
    const response = await request.get('/ordersproducts/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
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
