import Client from '../database'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
}

export class ProductsModel {
  //getAllProducts
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await connection.query(sql)
      const product = result.rows
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to get The Products error: ${error}`)
    }
  }

  async showByCategory(category: string): Promise<Product[]> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM products WHERE category=($1)'
      const result = await connection.query(sql, [category])
      const product = result.rows
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to get the product with the id ${category} error: ${error}`)
    }
  }

  //getProduct
  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await connection.query(sql, [id])
      const product = result.rows[0]
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to get the product with the id ${id} error: ${error}`)
    }
  }

  //createProduct
  async create(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect()
      const sql =
        'INSERT INTO products (title, price, description, category) VALUES($1, $2, $3, $4) RETURNING *'
      const result = await connection.query(sql, [p.title, p.price, p.description, p.category])
      const product = result.rows[0]
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to Create product error: ${error}`)
    }
  }

  //deleteProduct
  async delete(id: number): Promise<Product> {
    try {
      const connection = await Client.connect()
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      const result = await connection.query(sql, [id])
      const product = result.rows[0]
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to delete product ${id} error: ${error}`)
    }
  }

  //updateProduct
  async update(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect()
      const sql =
        'UPDATE products SET title=($2), price=($3), description=($4), category=($5) WHERE id=($1) RETURNING *'
      const result = await connection.query(sql, [
        p.id,
        p.title,
        p.price,
        p.description,
        p.category
      ])
      const product = result.rows[0]
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to update ${p.title} error: ${error}`)
    }
  }

  //get All popular products
  async popular(): Promise<Product[]> {
    try {
      const connection = await Client.connect()
      const sql =
        'SELECT products.title, products.price, products.description, products.category FROM orders_products INNER JOIN products ON products.id = orders_products.product_id GROUP BY products.title, products.description, products.price, products.category ORDER BY SUM(quantity) DESC LIMIT 5;'
      const result = await connection.query(sql)
      const product = result.rows
      connection.release()
      return product
    } catch (error) {
      throw new Error(`Unable to get The Products error: ${error}`)
    }
  }
}
