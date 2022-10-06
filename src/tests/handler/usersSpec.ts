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

describe('Users Endpoints Test', () => {
  it('test creat a user', async () => {
    const response = await request.post('/users').send({
      first_name: 'Abanob',
      last_name: 'Ashraf',
      email: 'abanobashraf74@gmail.com',
      password: '1410A'
    })
    expect(response.status).toBe(200)
  })

  it('test get all users', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(401)
  })

  it('test get all users with jwt', async () => {
    const response = await request.get('/users').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test get user by id', async () => {
    const response = await request.get('/users/1')
    expect(response.status).toBe(401)
  })

  it('test get user by id with a jwt', async () => {
    const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test update a user by id', async () => {
    const response = await request.put('/users/1').send({
      first_name: 'Abanob',
      last_name: 'Ashraf',
      email: 'abanobashraf74@gmail.com',
      password: 'Abanob1410'
    })
    expect(response.status).toBe(401)
  })

  it('test update a user by id with jwt ', async () => {
    const response = await request
      .put('/users/1')
      .send({
        first_name: 'Abanob',
        last_name: 'Ashraf',
        email: 'abanobashraf74@gmail.com',
        password: 'Abanob1410'
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  it('test delete a user by id', async () => {
    const response = await request.delete('/users/1')
    expect(response.status).toBe(401)
  })

  it('test delete a user by id with jwt ', async () => {
    const response = await request.delete('/users/1').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    connection.release()
  })
})
