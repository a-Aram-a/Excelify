import { Express } from "express";
import router from "./entry-points/api";

export const COMPONENT_ROOT_PATH = __dirname

export default (app: Express) => {
    app.use("/images", router);
}