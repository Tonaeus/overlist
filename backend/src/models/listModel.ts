import { Model, Schema, model } from "mongoose";

type IList = {
  label: string;
  directory_id: string;
  createdAt: Date;
  updatedAt: Date;
  uid: string;
}

type IListMethods = {
  update(): void;
}

type ListModel = Model<IList, {}, IListMethods>;

const listSchema = new Schema<IList, ListModel, IListMethods>({
  label: {
    type: String,
    required: true,
  },
  directory_id: {
    type: String,
    default: null
  },
  uid: {
    type: String,
    required: true,
  }
}, { timestamps: true })

listSchema.method('update', function update() {
  this.updatedAt = new Date();
  return this.save();
});

const List = model<IList, ListModel>("List", listSchema);

export default List;
