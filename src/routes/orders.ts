import { Router } from 'express'
import { authorize } from '../middlewares/authantication'
import {
  getAllOrders,
  getOrderByID,
  createOrder,
  deleteOrder,
  updateOrder,
  getcompleteByUserID,
  getActiveByUserID,
  getOrderByUserID
} from '../handler/orders'

const routes = Router()

routes.get('/orders', authorize, getAllOrders)

routes.get('/orders/complete', authorize, getcompleteByUserID)

routes.get('/orders/active', authorize, getActiveByUserID)

routes.get('/orders/user/:id', authorize, getOrderByUserID)

// routes.get('/orders/:id/user/:userid', authorize, getOrderByID, getOrderByUserID)

routes.get('/orders/:id', authorize, getOrderByID)

routes.post('/orders', authorize, createOrder)

routes.delete('/orders/:id', authorize, deleteOrder)

routes.put('/orders/:id', authorize, updateOrder)

export default routes
