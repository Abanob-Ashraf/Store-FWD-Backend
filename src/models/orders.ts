import Client from '../database'

export type Order = {
  id: number
  status: string
  user_id: number
  order_time: Date
}

export class OrdersModel {
  //getAllOrders
  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await connection.query(sql)
      const order = result.rows
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to get all the orders: ${error}`)
    }
  }

  //get Order By ORDER ID
  async show(id: number): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await connection.query(sql, [id])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to get the order error: ${error}`)
    }
  }

  async showByUserID(id: number): Promise<Order[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      const result = await connection.query(sql, [id])
      const order = result.rows
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to get the order error: ${error}`)
    }
  }

  //get Order By user ID
  async showActiveByUserID(o: Order): Promise<Order[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
      const result = await connection.query(sql, [o.user_id, o.status])
      const order = result.rows
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to get the order error: ${error}`)
    }
  }

  //get complete Order By user ID
  async showCompleteByUserID(o: Order): Promise<Order[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
      const result = await connection.query(sql, [o.user_id, o.status])
      const order = result.rows
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to get the order error: ${error}`)
    }
  }

  //createOrder
  async create(o: Order): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = 'INSERT INTO orders (status, user_id, order_time) VALUES($1, $2, $3) RETURNING *'
      const result = await connection.query(sql, [o.status, o.user_id, o.order_time])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to add the order error: ${error}`)
    }
  }

  //deleteOrder
  async delete(id: number): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
      const SQL = 'DELETE FROM orders_products WHERE order_id=($1)'
      await connection.query(SQL, [id])
      const result = await connection.query(sql, [id])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to delete order ${id} error: ${error}`)
    }
  }

  //updateOrder
  async update(o: Order): Promise<Order> {
    try {
      const connection = await Client.connect()
      const sql =
        'UPDATE orders SET status=($2), user_id=($3), order_time=($4) WHERE id=($1) RETURNING *'
      const result = await connection.query(sql, [o.id, o.status, o.user_id, o.order_time])
      const order = result.rows[0]
      connection.release()
      return order
    } catch (error) {
      throw new Error(`Unable to update order ${o.id} error: ${error}`)
    }
  }
}
