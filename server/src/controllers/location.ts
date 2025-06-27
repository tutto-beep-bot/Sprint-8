import { Request, Response } from "express";
import Location from "../models/location";

export const getLocations = async(req: Request, res: Response) => {
    const locations = await Location.findAll();
    res.json(locations);
}

export const postLocation = async(req: Request, res: Response) => {
    const {name, latitude, longitude } = req.body;

    try {
        const newLocation = await Location.create({name, latitude, longitude});
        res.status(201).json(newLocation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: `Error saving location: ${error}` })
    }
};

