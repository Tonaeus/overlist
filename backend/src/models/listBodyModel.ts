import { Schema, model } from "mongoose";

type IRow = {
  [column_id: string]: string
}

type IListBody =  {
  rows: IRow[];
  list_id: string;
  uid: string;
}

const rowSchema = new Schema({}, { strict: false });

const listBodySchema = new Schema<IListBody>({
  rows: {
    type: [rowSchema],
    default: []
  },
  list_id: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const ListBody = model<IListBody>("ListBody", listBodySchema, "list_bodies");

export default ListBody;
