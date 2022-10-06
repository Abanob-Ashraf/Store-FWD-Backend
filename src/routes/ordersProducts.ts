import { Router } from 'express'
import {
  createOrderProduct,
  deleteOrderProductByOrderId,
  getAllOrdersProducts,
  indexByOrderId,
  updateOrderProduct
} from '../handler/ordersProducts'
import { authorize } from '../middlewares/authantication'

const routes = Router()

routes.get('/ordersproducts', authorize, getAllOrdersProducts)

routes.get('/ordersproducts/:id', authorize, indexByOrderId)

routes.post('/ordersproducts', authorize, createOrderProduct)

routes.delete('/ordersproducts/:id', authorize, deleteOrderProductByOrderId)

routes.put('/ordersproducts', authorize, updateOrderProduct)

export default routes
