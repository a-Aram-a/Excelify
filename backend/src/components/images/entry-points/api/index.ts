import express from "express";
import multer from "multer";
import config from "config";
import { filterUploadFileType } from "libraries/upload";
import { imageUploadController } from "./controllers";

const router = express.Router();

const upload = multer({
    dest: config.UPLOADS_PATH,
    limits: { fileSize: config.MAX_FILE_SIZE },
});

router.route('/')
    .post(upload.single('image'), filterUploadFileType(config.ALLOWED_FILE_TYPES), imageUploadController)


export default router