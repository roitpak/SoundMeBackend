import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import swaggerDocs from '@/utils/swagger';

class App {
    public exrpess: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.exrpess = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseController(controllers);
        this.initialiseErrorHandling();
    }
    private initialiseMiddleware(): void {
        this.exrpess.use(helmet());
        this.exrpess.use(cors());
        this.exrpess.use(morgan('dev'));
        this.exrpess.use(express.json());
        this.exrpess.use(express.urlencoded({ extended: false }));
        this.exrpess.use(compression());
    }
    private initialiseController(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.exrpess.use('/api', controller.router);
        })
    }
    private initialiseErrorHandling(): void {
        this.exrpess.use(ErrorMiddleware);
    }
    private initialiseDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        );
    }
    public listen(): void {
        this.exrpess.listen(this.port, () => {
            console.log("I am here");
            swaggerDocs(this.exrpess, this.port);
            console.info('Listening on port ' + this.port)
        })
    };
}
export default App;