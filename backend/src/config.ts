import path from "path";
require("dotenv").config();

const ROOT_PATH = path.resolve(__dirname, "..");

export default {
    PORT: process.env.PORT ?? 3001,
    UPLOADS_PATH: process.env.UPLOADS_PATH ?? path.resolve(ROOT_PATH, "files", "uploads"),
    RESULTS_PATH: process.env.RESULTS_PATH ?? path.resolve(ROOT_PATH, "files", "results"),
    MAX_FILE_SIZE: !isNaN(Number(process.env.MAX_FILE_SIZE)) ? Number(process.env.MAX_FILE_SIZE) : 2*1024*1024,
    ALLOWED_FILE_TYPES: (process.env.ALLOWED_FILE_TYPES ?? "image/jpeg,image/png").split(",").map(x => x.trim()),
    MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/excelify"
}