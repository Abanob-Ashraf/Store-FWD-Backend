import express, { Application, Request, Response } from 'express'
import * as dotenv from 'dotenv'

import usersRoutes from './routes/users'
import productsRoutes from './routes/products'
import orderRoutes from './routes/orders'
import ordersProductsRoutes from './routes/ordersProducts'

dotenv.config()

const PORT = process.env.PORT || 3000

const app: Application = express()

app.use(express.json())

app.get('/', async (_req: Request, res: Response) => {
  res.json({ Message: 'Hello to 2st project: StoreFront Backend' })
})

app.use(usersRoutes)
app.use(productsRoutes)
app.use(orderRoutes)
app.use(ordersProductsRoutes)

app.listen(PORT, () => {
  console.log(`Server started on Port :${PORT}`)
})

export default app
