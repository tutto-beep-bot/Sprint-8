import { Request, Response } from "express";
import Delivery from "../models/delivery";

export const getDeliveries = async (req: Request, res: Response) => {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
};

export const postDelivery = async (req: Request, res: Response) => {
    const { title, start, end } = req.body;

    try{
        const newDelivery = await Delivery.create({ title, start, end });
        res.status(201).json(newDelivery);
    } catch(error) {
        console.error(error);
        res.status(500).json({ msg: `Error saving delivery: ${error}`});
    }
};

export const putDelivery = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, start, end } = req.body;

    try {
        const delivery = await Delivery.findByPk(id);
        if (!delivery) return res.status(404).json({ msg: 'Not Found' });

        await delivery.update({ title, start, end });
        res.json(delivery);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            msg: `Error updating delivery: ${error}`
        });
    }
}

export const deleteDelivery = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const delivery = await Delivery.findByPk(id);
        if (!delivery) return res.status(404).json({
            msg: 'Not found'
        });

        await delivery.destroy();
        res.json({'Deleted successfully'});

    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: `Error deleting delivery: ${error}`
        });
    }
};