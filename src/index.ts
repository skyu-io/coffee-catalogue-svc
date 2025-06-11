import express from "express";
import configData from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { dataSource } from "./configs/db";

const app = express();

dataSource
  .initialize()
  .then(() => {
    console.log("DB Connected and Initialized");
    app.use(express.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    app.use(cors());
    app.use(router);

    app.listen(configData.port, () => {
      console.log(`coffee-catalogue-svc started on port :: ${configData.port}`);
    });
  })
  .catch((err) => {
    console.error("Error Initializing DB", err);
    process.exit(1); // Ensure the process exits on DB connection error
  });
