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