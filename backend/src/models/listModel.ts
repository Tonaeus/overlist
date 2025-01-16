import { Schema, model } from "mongoose";

interface IList {
  label: string,
  directory_id: string
}

const listSchema = new Schema<IList>({
  label: {
    type: String,
    required: true
  },
  directory_id: {
    type: String,
    required: true
  },
}, {timestamps: true} )

const List = model<IList>("List", listSchema);

export default List;
