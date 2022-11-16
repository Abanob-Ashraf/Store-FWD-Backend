import { Request, Response } from 'express'
import { OrdersProducts, OrdersProductsModel } from '../models/ordersProducts'

const store = new OrdersProductsModel()

export const getAllOrdersProducts = async (_req: Request, res: Response) => {
  try {
    const AllOrdersProduct = await store.index()
    return res.send(AllOrdersProduct)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const indexByOrderId = async (req: Request, res: Response) => {
  try {
    const orderProductByOrderId = await store.showByOrderId(+req.params.id)
    return res.json(orderProductByOrderId)
  } catch (error) {
    res.status(401).json(error)
  }
}

// * create an order_product
export const createOrderProduct = async (req: Request, res: Response) => {
  try {
    const ordersProducts: OrdersProducts = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      id: undefined as unknown as number
    }

    const newOrderProduct = await store.create(ordersProducts)
    return res.json(newOrderProduct)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteOrderProductByOrderId = async (req: Request, res: Response) => {
  try {
    const deleteOrderProduct = await store.delete(+req.params.id)
    return res.send(deleteOrderProduct)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const OrderProduct: OrdersProducts = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      id: undefined as unknown as number
    }
    const updatedOrderProduct = await store.update(OrderProduct)
    return res.send(updatedOrderProduct)
  } catch (error) {
    res.status(400).json(error)
  }
}
