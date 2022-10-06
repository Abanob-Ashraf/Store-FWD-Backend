import { Router } from 'express'
import { authorize } from '../middlewares/authantication'
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByCategory,
  getPopular
} from '../handler/products'

const routes = Router()

routes.get('/products', getAllProducts)

routes.get('/products/popular', getPopular)

routes.get('/products/category', getProductByCategory)

routes.get('/products/:id', getProduct)

routes.post('/products', authorize, createProduct)

routes.delete('/products/:id', authorize, deleteProduct)

routes.put('/products/:id', authorize, updateProduct)

export default routes
