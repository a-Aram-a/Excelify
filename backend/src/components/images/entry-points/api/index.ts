import express from "express";
import fs from "fs";
import multer from "multer";
import config from "config";
import { filterUploadFileType } from "libraries/upload";
import { imageUploadController } from "./controllers";

const router = express.Router();

if (!fs.existsSync(config.UPLOADS_PATH)) {
    fs.mkdirSync(config.UPLOADS_PATH, { recursive: true });
}
if (!fs.existsSync(config.RESULTS_PATH)) {
    fs.mkdirSync(config.RESULTS_PATH, { recursive: true });
}

const upload = multer({
    dest: config.UPLOADS_PATH,
    limits: { fileSize: config.MAX_FILE_SIZE },
});

router.route('/')
    .post(upload.single('image'), filterUploadFileType(config.ALLOWED_FILE_TYPES), imageUploadController)


export default router