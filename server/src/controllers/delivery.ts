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

