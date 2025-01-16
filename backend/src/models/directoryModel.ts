import { Schema, model } from "mongoose";

interface IDirectory {
  label: string
}

const directorySchema = new Schema<IDirectory>({
  label: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Directory = model<IDirectory>("Directory", directorySchema, "directories");

export default Directory;
