import { Request, Response } from "express";
import Delivery from "../models/delivery";


export const getDeliveries = async (req: Request, res: Response) => {
    const deliveries = await Delivery.findAll();
    res.json(deliveries);
};

export const postDelivery = async (req: Request, res: Response) => {
    const { title, start, end, description } = req.body;

    try{
        const newDelivery = await Delivery.create({ title, start, end, description });
        res.status(201).json(newDelivery);
    } catch(error) {
        console.error(error);
        res.status(500).json({ msg: `Error saving delivery: ${error}`});
    }
};

export const putDelivery = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, start, end, description } = req.body;

    try {
        const delivery = await Delivery.findByPk(id);
        if (!delivery) {
            res.status(404).json({ msg: 'Not Found' });
            return
        }
        await delivery.update({ title, start, end, description });
        res.json(delivery);
    } catch(error) {
        console.error(error);
        res.status(500).json({ msg: `Error updating delivery: ${error}` });
    }
}

export const deleteDelivery = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const delivery = await Delivery.findByPk(id);
        if (!delivery){
            res.status(404).json({ msg: 'Not found' });
            return
        }
        await delivery.destroy();
        res.json({ msg: 'Deleted successfully'});

    }catch(error){
        console.error(error);
        res.status(500).json({ msg: `Error deleting delivery: ${error}` });
    }
};