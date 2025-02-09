import { Schema, model } from "mongoose";

type IDirectory = {
  label: string
}

const directorySchema = new Schema<IDirectory>({
  label: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Directory = model<IDirectory>("Directory", directorySchema, "directories");

export default Directory;
