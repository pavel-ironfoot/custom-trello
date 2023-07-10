import express from "express";
import { usercontroller } from "./controllers";
import bodyparser from "body-parser";
import morgan from 'morgan';
import cors from "cors-ts";
import helmet from "helmet";

export class App {
    app = express();
    port = 8000;

    useRoutes() {
        this.app.use("/users", usercontroller.router);
    }

    useMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan(':date[iso] ":method :url" :status :res[content-length]'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    async init() {
        this.useMiddlewares();
        this.useRoutes();
        this.app.listen(this.port, () => {
            console.log('Server is listening on: http://localhost:%s', this.port)
        })
    }
}

(async () => {
    const app = new App();
    app.init();
})();