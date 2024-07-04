import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
import AuthRouter from "./router/AuthRouter";
import * as mongoose from "mongoose";
import * as mongoDB from "./lib/mongoDB";
import KTBankSchema from "./schema/KTBank.schema";
import { KTBank } from "./controller/KTBank";
import SubmitTransfer from "./controller/SubmitTransfer";
import { ILoginFormWeb } from "./@types/KTBank";
import ErrorRequestHandler from "./middleware/ErrorRequestHandler";
dotenv.config({ path: __dirname + "/.env" });
const app: Express = express();
app.use(express.json());
const port: number | string = process.env.PORT || 5000;
mongoDB.start();

async function debugMain() {
  const payloadExample: ILoginFormWeb = {
    "companyId": "EX00",
    "username": "EX00",
    "password": "EX00",
  };

  const payloadVTEC:ILoginFormWeb = {
    companyId:"",
    username: "",
    password: ""
  }
  SubmitTransfer(payloadExample);
  SubmitTransfer(payloadVTEC);
}

// debugMain();
//ROUTES
app.use("/api", AuthRouter);
app.use(ErrorRequestHandler)
app.listen(port, () => {
  console.log(`[SERVER]: Server running at http://localhost:${port}`);
});
