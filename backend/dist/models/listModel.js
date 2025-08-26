import { Model, Schema, model } from "mongoose";
const listSchema = new Schema({
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
}, { timestamps: true });
listSchema.method('update', function update() {
    this.updatedAt = new Date();
    return this.save();
});
const List = model("List", listSchema);
export default List;
//# sourceMappingURL=listModel.js.map