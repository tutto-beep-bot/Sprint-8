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

export const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Product.create(body);
        res.json({
            msg: 'The product was added successfully'
        })
    } catch(error){
        console.log(error);
        res.json({
            msg: `Ooops, there was an error: (${error}). Please contact support.`
        })
    }


    
}

export const updateProduct = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if(product){
            await product.update(body)
            res.json({
                msg: 'The product was edited successfully.'
            })
        } else {
            res.status(404).json({
                msg: `There is no product with this id: ${id}` 
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ooops, there was an error: (${error}). Please contact support.`
        })
    }
}