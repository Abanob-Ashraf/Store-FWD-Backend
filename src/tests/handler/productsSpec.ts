import app from '../../main'
import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import Client from '../../database'

const request = supertest(app)

const testUser = {
  first_name: 'Abanob',
  last_name: 'Ashraf',
  email: 'abanobashraf74@gmail.com',
  password: '1410A'
}

const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string)

describe('Products Endpoints Test', () => {
  it('test creat a product', async () => {
    const response = await request.post('/products').send({
      title: 'iPhone',
      price: 990,
      description: 'Smart Phone',
      category: 'phone'
    })
    expect(response.status).toBe(401)
  })

  it('test create a product with jwt ', async () => {
    const response = await request
      .post('/products')
      .send({
        title: 'iPhone',
        price: 990,
        description: 'Smart Phone',
        category: 'phone'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test get all products', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })

  it('test get products by category', async () => {
    const response = await request.get('/products/category').send({
      category: 'phone'
    })
    expect(response.status).toBe(200)
  })

  it('test get products by id', async () => {
    const response = await request.get('/products/1')
    expect(response.status).toBe(200)
  })

  it('test update a products by id', async () => {
    const response = await request.put('/products/1').send({
      title: 'Samsung',
      price: 550,
      description: 'Smart Phone2',
      category: 'phone'
    })
    expect(response.status).toBe(401)
  })

  it('test update a products by id with jwt ', async () => {
    const response = await request
      .put('/products/1')
      .send({
        title: 'Samsung',
        price: 550,
        description: 'Smart Phone2',
        category: 'phone'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test delete a product by id', async () => {
    const response = await request.delete('/products/1')
    expect(response.status).toBe(401)
  })

  it('test delete a product by id with jwt ', async () => {
    const response = await request.delete('/products/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test get all products', async () => {
    const response = await request.get('/products/popular')
    expect(response.status).toBe(200)
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    connection.release()
  })
})
