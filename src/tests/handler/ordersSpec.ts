import supertest from 'supertest'
import { User, UsersModel } from '../../models/users'
import jwt from 'jsonwebtoken'
import app from '../../main'
import Client from '../../database'

const user = new UsersModel()

const request = supertest(app)

const testUser = {
  first_name: 'Abanob',
  last_name: 'Ashraf',
  email: 'abanobashraf74@gmail.com',
  password: '1410A'
}

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string)

describe('Orders Endpoints Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User)
  })

  it('test create orders', async () => {
    const response = await request.get('/orders').send({
      status: 'in way',
      user_id: 1,
      order_time: new Date()
    })
    expect(response.status).toBe(401)
  })

  it('test create orders with jwt', async () => {
    const response = await request
      .get('/orders')
      .send({
        status: 'in way',
        user_id: 1,
        order_time: new Date()
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show all orders', async () => {
    const response = await request.get('/orders')
    expect(response.status).toBe(401)
  })

  it('test show all orders with jwt', async () => {
    const response = await request.get('/orders').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show orders by orderId', async () => {
    const response = await request.get('/orders/1')
    expect(response.status).toBe(401)
  })

  it('test show orders by orderId with jwt', async () => {
    const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show orders by userId', async () => {
    const response = await request.get('/orders/user/1')
    expect(response.status).toBe(401)
  })

  it('test show orders by userId with jwt', async () => {
    const response = await request.get('/orders/user/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show Active orders by userId', async () => {
    const response = await request.get('/orders/active').send({
      user_id: 1
    })
    expect(response.status).toBe(401)
  })

  it('test show Active orders by userId with jwt', async () => {
    const response = await request
      .get('/orders/active')
      .send({
        user_id: 1
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test show complete orders by userId', async () => {
    const response = await request.get('/orders/complete').send({
      user_id: 1
    })
    expect(response.status).toBe(401)
  })

  it('test show complete orders by userId with jwt', async () => {
    const response = await request
      .get('/orders/complete')
      .send({
        user_id: 1
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test update orders by id', async () => {
    const response = await request.get('/orders/1')
    expect(response.status).toBe(401)
  })

  it('test update orders by id with jwt', async () => {
    const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test delete orders by id', async () => {
    const response = await request.get('/orders/1')
    expect(response.status).toBe(401)
  })

  it('test delete orders by id with jwt', async () => {
    const response = await request.get('/orders/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
    connection.release()
  })
})
