import Client from '../database'

export type OrdersProducts = {
  id: number
  order_id: number
  product_id: number
  quantity: number
}

//orderProduct
export class OrdersProductsModel {
  //getAllOrdersProducts
  async index(): Promise<OrdersProducts[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders_products'
      const result = await connection.query(sql)
      const ordersProducts = result.rows
      connection.release()
      return ordersProducts
    } catch (error) {
      throw new Error(`Unable to get all the orders products: ${error}`)
    }
  }

  // get all the order_products with order_id
  async showByOrderId(id: number): Promise<OrdersProducts> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM orders_products WHERE order_id=($1)'
      const result = await connection.query(sql, [id])
      const ordersProducts = result.rows[0]
      connection.release()
      return ordersProducts
    } catch (error) {
      throw new Error(`Could not get orders products. Error: ${error}`)
    }
  }

  //add ordersProducts

  async create(op: OrdersProducts): Promise<OrdersProducts> {
    try {
      const connection = await Client.connect()
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
      const result = await connection.query(sql, [op.order_id, op.product_id, op.quantity])
      const ordersProducts = result.rows[0]
      connection.release()
      return ordersProducts
    } catch (error) {
      throw new Error(`Could not add product. Error: ${error}`)
    }
  }

  async delete(order_id: number): Promise<OrdersProducts> {
    try {
      const connection = await Client.connect()
      const sql = 'DELETE FROM orders_products WHERE order_id=($1) RETURNING *'
      const result = await connection.query(sql, [order_id])
      const ordersProducts = result.rows[0]
      connection.release()
      return ordersProducts
    } catch (error) {
      throw new Error(`Could not delete orders products ${order_id}. Error: ${error}`)
    }
  }

  async update(op: OrdersProducts): Promise<OrdersProducts> {
    try {
      const connection = await Client.connect()
      const sql =
        'UPDATE orders_products SET quantity=($1) WHERE order_id=($2) AND product_id=($3) RETURNING *'
      const result = await connection.query(sql, [op.quantity, op.order_id, op.product_id])
      const ordersProducts = result.rows[0]
      connection.release()
      return ordersProducts
    } catch (error) {
      throw new Error(
        `Could not update order ${op.order_id} and product ${op.product_id}. Error: ${error}`
      )
    }
  }
}
