import mongoose from "mongoose";

interface CalculationInterface {
  title: string;
  filePath: string;
  calculationString?: string;
  calculationResult?: number;
}

const calculationSchema = new mongoose.Schema<CalculationInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
    },
    calculationString: {
      type: String,
    },
    calculationResult: {
      type: Number,
    },
  },
  { timestamps: true }
);

const calculationModel = mongoose.model("calculations", calculationSchema);
export default calculationModel;
