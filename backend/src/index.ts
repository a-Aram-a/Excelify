import express from "express";

// config
import config from "./config";

// components
import imageComponent from "components/images";
import errorsComponent from "components/errors";
import initDb from "libraries/db";

// app
const app = express();

// middlewares
app.use(express.json());

// init components
initDb()
imageComponent(app)
errorsComponent(app)

// init server
app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`))