import { Request, Response } from "express"
import Product from "../models/product"

export const getProducts = async (req: Request, res: Response) => {
    const productList = await Product.findAll()
    
    res.json(productList)
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(product){
        res.json(product)
    } else {
        res.status(404).json({
            msg: `There is no product with this id: ${id}` 
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        res.status(404).json({
            msg: `There is no product with this id: ${id}` 
        })
    }else {
        await product.destroy();
        res.json({
            msg: 'The product was deleted successfully.'
        })
    }
}

export const postProduct = (req: Request, res: Response) => {
    const { body } = req;

    res.json({
        msg: 'Post Product',
        body
    })
}

export const updateProduct = (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    res.json({
        msg: 'Update Product',
        id,
        body
    })
}