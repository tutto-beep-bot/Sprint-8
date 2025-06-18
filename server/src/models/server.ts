import express, { Application, Request, Response } from 'express';

class Server {
    private app: Application;
    private port: string;


    constructor() {
        console.log(process.env.PORT)
        this.app = express();
        this.port = '3001';
        this.listen();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Application running in port ${this.port}`)
        })
    }
}

export default Server