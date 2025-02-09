import { Schema, model } from "mongoose";

type IList = {
  label: string,
  directory_id: string
  createdAt: Date 
  updatedAt: Date
}

const listSchema = new Schema<IList>({
  label: {
    type: String,
    required: true,
    unique: true
  },
  directory_id: {
    type: String,
    default: null  
  },
}, {timestamps: true} )

const List = model<IList>("List", listSchema, "list");

export default List;
