import cors from "cors";
import express, { Application } from "express";
import fs from "fs";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import CalculationRouter from "./routes/calculations";

/* Initialize Express Instance */
const app: Application = express();

/* Create Uploads Folder for file upload | if not exits!! */
export const uploadFolderName = path.join(__dirname + "/uploads/");
if (!fs.existsSync(uploadFolderName)) {
  fs.mkdirSync(uploadFolderName);
  console.log("File Upload Folder Created Successfully!");
}

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.use("/static/uploads/files/", express.static("uploads"));

/* Route's */
app.use("/", CalculationRouter);

/* Database Connection */
try {
  mongoose.connect("mongodb://localhost/calculationApp");
  console.log("✅ Database Connected Successfully");
} catch (err) {
  console.log("❌ Database Not Connected");
}

/* Run Express Server */
try {
  const port = process.env.PORT || 8000;
  app.listen(port, (): void => {
    console.log(`✅ Server is running at http://localhost:${port}/`);
  });
} catch (error: any) {
  console.error(`❌ Error occured: ${error.message}`);
}
