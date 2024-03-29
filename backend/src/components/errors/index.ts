import { Express } from "express";
import errorHandler from "./entry-points/api/errorHandler";

export default (app: Express) => {
    app.use(errorHandler);
}