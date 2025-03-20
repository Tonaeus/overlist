import { Schema, model } from "mongoose";

type IDirectory = {
  label: string;
  uid: string;
}

const directorySchema = new Schema<IDirectory>({
  label: {
    type: String,
    required: true,
    unique: true
  },
  uid: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Directory = model<IDirectory>("Directory", directorySchema, "directories");

export default Directory;
