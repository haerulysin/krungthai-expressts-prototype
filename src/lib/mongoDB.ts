import mongoose from "mongoose";

const MONG_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

export function start() {
  mongoose
    .connect(MONG_URI, {dbName:"AllPay"})
    .then(() => console.log("MongoDB:Connected"))
    .catch((e) => {
      console.log("MongoDB:ERROR", e);
    });
}