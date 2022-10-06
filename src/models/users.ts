import Client from '../database'
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUND
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

export class UsersModel {
  //getAllUsers
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT id, first_name, last_name, email FROM users'
      const result = await connection.query(sql)
      const user = result.rows
      connection.release()
      return user
    } catch (error) {
      throw new Error(`Unable to get users error: ${error}`)
    }
  }

  //getUser
  async show(id: number): Promise<User[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT id, first_name, last_name, email FROM users WHERE id=($1);'
      const sql2 =
        'SELECT products.title, orders.order_time FROM orders INNER JOIN users ON users.id=($1) INNER JOIN orders_products ON orders_products.order_id = orders.id INNER JOIN products ON orders_products.product_id = products.id WHERE orders.user_id = users.id ORDER BY orders.order_time DESC LIMIT 5;'
      const result = await connection.query(sql, [id])
      const result2 = await connection.query(sql2, [id])
      const user = { ...result.rows[0], data: result2.rows }
      connection.release()
      return user
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to get user ${id} error: ${error}`)
    }
  }

  //createUser
  async create(u: User): Promise<User> {
    try {
      const connection = await Client.connect()
      const sql =
        'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING id, first_name, last_name, email'
      const hashing = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds as string))
      const result = await connection.query(sql, [u.first_name, u.last_name, u.email, hashing])
      const user = result.rows[0]
      connection.release()
      return user
    } catch (error) {
      throw new Error(`Unable to create ${u.first_name + ' ' + u.last_name} error: ${error}`)
    }
  }

  //deleteUser
  async delete(id: number): Promise<User> {
    try {
      const connection = await Client.connect()

      const selectsql =
        'SELECT orders_products.id AS orders_products From orders INNER JOIN users ON users.id = orders.user_id INNER JOIN orders_products ON orders_products.order_id = orders.id WHERE users.id = ($1)'
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name, email'
      const SQL1 = 'DELETE FROM orders WHERE user_id=($1)'
      const SQL2 = 'DELETE FROM orders_products WHERE orders_products.id=($1)'

      const resultSelect = await connection.query(selectsql, [id])
      resultSelect.rows.forEach(
        async (item) => await connection.query(SQL2, [item['orders_products']])
      )
      await connection.query(SQL1, [id])
      const { rows } = await connection.query(sql, [id])

      const user = rows[0]
      connection.release()
      return user
    } catch (error) {
      throw new Error(`Unable to delete user ${id} error: ${error}`)
    }
  }

  //updateUser
  async update(u: User): Promise<User> {
    try {
      const connection = await Client.connect()
      const sql =
        'UPDATE users SET first_name=($2), last_name=($3), email=($4), password=($5)  WHERE id=($1) RETURNING id, first_name, last_name, email'
      const hashing = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds as string))
      const result = await connection.query(sql, [
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        hashing
      ])
      const user = result.rows[0]
      connection.release()
      return user
    } catch (error) {
      throw new Error(`Unable to update ${u.id} error: ${error}`)
    }
  }
}
