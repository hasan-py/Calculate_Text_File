import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import calculationModel from "../models/calculations";
import CalculateString from "../_helper/inputToCalculations";
import { uploadFolderName } from "./../server";

export const uploadFolderWithFullPath = (filename: string | undefined) =>
  uploadFolderName + filename;

const validTextFileErr: string = "Please attach a valid text file!";

class Calculation {
  async getAllCalculations(req: Request, res: Response) {
    let data = await calculationModel.find();
    return res.status(200).json(data);
  }

  async postSaveCalculation(req: Request, res: Response) {
    const filename = req?.file?.filename;
    const bodyData = req?.body;

    if (!filename) {
      return res.status(500).json({ error: validTextFileErr });
    }

    if (req?.file?.mimetype !== "text/plain") {
      /* If not text file then remove from uploads */
      await fs.unlink(uploadFolderWithFullPath(filename), (err) => {
        if (err) {
          console.log("File Deleting Failed Err", err);
        }
        console.log("Deleted Wrong format File!");
        return res.status(500).json({ error: validTextFileErr });
      });
    } else {
      fs.readFile(
        uploadFolderWithFullPath(filename),
        "utf8",
        async function (err, data) {
          let result = CalculateString(data);
          console.log(result, data);

          let newCalculation = new calculationModel({
            title: bodyData?.title,
            filePath: filename,
            calculationString: data,
            calculationResult: result,
          });

          let save = await newCalculation.save();
          if (save) {
            return res
              .status(200)
              .json({ result, data, message: "Calculate Successfully!" });
          }
        }
      );
    }
  }
}

export const calculationController = new Calculation();
