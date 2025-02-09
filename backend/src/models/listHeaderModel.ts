import { Schema, model } from "mongoose";

type IColumn = {
  label: string
}

type IListHeader = {
  columns: IColumn[];
  list_id: string;
}

const columnSchema = new Schema<IColumn>({
  label: {
    type: String,
    required: true
  }
}, { strict: false });

const listHeaderSchema = new Schema<IListHeader>({
  columns: {
    type: [columnSchema],
    required: true
  },
  list_id: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const ListHeader = model<IListHeader>("ListHeader", listHeaderSchema, "list_headers");

export default ListHeader;
