import { Request, Response } from "express"

export const getProducts = (req: Request, res: Response) => {
    res.json({
        msg: 'Get Products'
    })
}

export const getProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Get Products',
        id
    })
}

export const deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Delete Product',
        id
    })
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