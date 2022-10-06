import Client from '../../database'
import { OrdersModel } from '../../models/orders'
import { User, UsersModel } from '../../models/users'

const user = new UsersModel()
const oreder = new OrdersModel()

const testUser = {
  first_name: 'Abanob',
  last_name: 'Ashraf',
  email: 'abanobashraf74@gmail.com',
  password: '1410A'
}

const currentDate = new Date()

describe('oreder Model Test', () => {
  beforeAll(async () => {
    await user.create(testUser as User)
  })

  it('should have an index method', () => {
    expect(oreder.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(oreder.show).toBeDefined()
  })

  it('should have a showByUserID method', () => {
    expect(oreder.showByUserID).toBeDefined()
  })

  it('should have a showActiveByUserID method', () => {
    expect(oreder.showActiveByUserID).toBeDefined()
  })

  it('should have a showcompleteByUserID method', () => {
    expect(oreder.showCompleteByUserID).toBeDefined()
  })

  it('should have a create method', () => {
    expect(oreder.create).toBeDefined()
  })

  it('should have a update method', () => {
    expect(oreder.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(oreder.delete).toBeDefined()
  })

  it('test create method ', async () => {
    const orederSpec = await oreder.create({
      status: 'Active',
      user_id: 1,
      id: undefined as unknown as number,
      order_time: currentDate
    })
    expect(orederSpec as unknown).toEqual({
      id: 1,
      status: 'Active',
      user_id: 1,
      order_time: currentDate
    })
  })

  it('test show method to show all oreders', async () => {
    const result = await oreder.index()
    expect(result as unknown).toEqual([
      {
        id: 1,
        status: 'Active',
        user_id: 1,
        order_time: currentDate
      }
    ])
  })

  it('test show method to show the oreder by id', async () => {
    const result = await oreder.show(1)
    expect(result as unknown).toEqual({
      id: 1,
      status: 'Active',
      user_id: 1,
      order_time: currentDate
    })
  })

  it('test show method to show the Active oreders by userid', async () => {
    const result = await oreder.showActiveByUserID({
      user_id: 1,
      status: 'Active',
      order_time: currentDate,
      id: undefined as unknown as number
    })
    expect(result as unknown).toEqual([
      {
        id: 1,
        status: 'Active',
        user_id: 1,
        order_time: currentDate
      }
    ])
  })

  it('test show method to show the oreders by userid', async () => {
    const result = await oreder.showByUserID(1)
    expect(result as unknown).toEqual([
      {
        id: 1,
        status: 'Active',
        user_id: 1,
        order_time: currentDate
      }
    ])
  })

  it('test update method to update the oreder by id', async () => {
    const result = await oreder.update({
      id: 1,
      status: 'complete',
      user_id: 1,
      order_time: currentDate
    })
    expect(result as unknown).toEqual({
      id: 1,
      status: 'complete',
      user_id: 1,
      order_time: currentDate
    })
  })

  it('test show method to show the complete oreders by id', async () => {
    const result = await oreder.showCompleteByUserID({
      user_id: 1,
      id: undefined as unknown as number,
      status: 'complete',
      order_time: currentDate
    })
    expect(result as unknown).toEqual([
      {
        id: 1,
        status: 'complete',
        user_id: 1,
        order_time: currentDate
      }
    ])
  })

  it('test delete method to delete the oreder by id', async () => {
    await oreder.delete(1)
    const result = await oreder.index()
    expect(result).toEqual([])
  })

  afterAll(async () => {
    const connection = await Client.connect()
    await connection.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
    connection.release()
  })
})
