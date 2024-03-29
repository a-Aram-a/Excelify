import path from "path";
require("dotenv").config();

const ROOT_PATH = path.resolve(__dirname, "..");

export default {
    PORT: process.env.PORT ?? 3001,
    IMAGES_PATH: process.env.IMAGES_PATH ?? path.resolve(ROOT_PATH, "files", "images"),
    RESULTS_PATH: process.env.RESULTS_PATH ?? path.resolve(ROOT_PATH, "files", "results"),
}