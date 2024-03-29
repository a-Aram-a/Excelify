import express from "express";

// config
import config from "./config";

// components
import imageComponent from "./components/images";

// app
const app = express();

// middlewares
app.use(express.json());

// init components
imageComponent(app)

// init server
app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`))