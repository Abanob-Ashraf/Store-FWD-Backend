import supertest from 'supertest'
import app from '../../main'

const request = supertest(app)

describe(' Test main route', () => {
  it('test the server', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
