import express from "express";
import multer from "multer";
import config from "config";

const router = express.Router();

const upload = multer({ dest: config.IMAGES_PATH })

router.route('/')
    .post(upload.single('image'), (req, res) => {
        res.send("hello")
    })


export default router