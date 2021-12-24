import express from "express";
import multer from "multer";
import { calculationController } from "../controllers/calculations";
import { uploadFolderName } from "../server";

const CalculationRouter = express.Router();

/* Multer Storage Setup */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderName);
  },
  filename: function (req, file: any, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file?.originalname);
  },
});
const upload = multer({ storage: storage });

/* All Route's */
CalculationRouter.get("/allFile", calculationController.getAllCalculations);
CalculationRouter.post(
  "/uploadFile",
  upload.single("uploaded_file"),
  calculationController.postSaveCalculation
);

export default CalculationRouter;
