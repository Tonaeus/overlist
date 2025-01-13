import mongoose from "mongoose";

const Schema = mongoose.Schema;

const directorySchema = new Schema({
  label: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Directory", directorySchema);
