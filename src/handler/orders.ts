import { Request, Response } from 'express'
import { Order, OrdersModel } from '../models/orders'

const store = new OrdersModel()

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const getOrders = await store.index()
    return res.send(getOrders)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const getOrderByID = async (req: Request, res: Response) => {
  try {
    const orderById = await store.show(+req.params.id)
    return res.json(orderById)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const getOrderByUserID = async (req: Request, res: Response) => {
  try {
    const orderById = await store.showByUserID(+req.params.id)
    return res.json(orderById)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const getActiveByUserID = async (req: Request, res: Response) => {
  try {
    const activeOrdersByUserID: Order = {
      status: 'Active',
      user_id: req.body.user_id,
      id: undefined as unknown as number,
      order_time: undefined as unknown as Date
    }
    const orderByUserID = await store.showActiveByUserID(activeOrdersByUserID)
    return res.json(orderByUserID)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const getcompleteByUserID = async (req: Request, res: Response) => {
  try {
    const completeOrdersByUserID: Order = {
      status: 'complete',
      user_id: req.body.user_id,
      id: undefined as unknown as number,
      order_time: undefined as unknown as Date
    }
    const completeOrderByUserID = await store.showCompleteByUserID(completeOrdersByUserID)
    return res.json(completeOrderByUserID)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
      id: undefined as unknown as number,
      order_time: new Date()
    }
    const newOrder = await store.create(order)
    return res.json(newOrder)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(+req.params.id)
    return res.send(deletedOrder)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const Order: Order = {
      id: +req.params.id,
      status: req.body.status,
      user_id: req.body.user_id,
      order_time: new Date()
    }
    const updatedOrder = await store.update(Order)
    return res.send(updatedOrder)
  } catch (error) {
    res.status(400).json(error)
  }
}
