import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesProduct from '../routes/product'
import db from '../db/connection';
import location from '../models/location';
import locationRoutes from '../routes/location';
import deliveryRoutes from '../routes/delivery';

class Server {
    private app: Application;
    private port: string;


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Application running in port ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg : 'API Working'
            })
        })
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/locations', locationRoutes);
        this.app.use('/api/deliveries', deliveryRoutes);
    }

    midlewares() {

        this.app.use(express.json());

        this.app.use(cors());

    }

    async dbConnect() {

        try {
            await db.authenticate();
            console.log('Database connected.')
            await db.sync();
        } catch(error) {
            console.log(error);
            console.log('Error connecting to database');
        }
    }

}

export default Server