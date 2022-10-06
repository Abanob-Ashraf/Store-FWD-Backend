import { Request, Response } from 'express'
import { Product, ProductsModel } from '../models/products'

const store = new ProductsModel()

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const AllProducts = await store.index()
    return res.send(AllProducts)
  } catch (error) {
    res.status(401).json(error)
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.show(+req.params.id)
    return res.send(product)
  } catch (error) {
    console.log(error)
    res.status(405).json(error)
  }
}

export const getProductByCategory = async (req: Request, res: Response) => {
  try {
    const product = await store.showByCategory(req.body.category)
    return res.send(product)
  } catch (error) {
    console.log(error)
    res.status(401).json(error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      id: undefined as unknown as number
    }
    const newProduct = await store.create(product)
    return res.send(newProduct)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(+req.params.id)
    return res.send(deleted)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const Product: Product = {
      id: +req.params.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category
    }
    const updatedProduct = await store.update(Product)
    return res.send(updatedProduct)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export const getPopular = async (_req: Request, res: Response) => {
  try {
    const AllPopularProducts = await store.popular()
    return res.send(AllPopularProducts)
  } catch (error) {
    res.status(401).json(error)
  }
}
