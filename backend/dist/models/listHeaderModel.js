import { Schema, model } from "mongoose";
const columnSchema = new Schema({
    label: {
        type: String,
        required: true
    }
}, { strict: false });
const listHeaderSchema = new Schema({
    columns: {
        type: [columnSchema],
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
const ListHeader = model("ListHeader", listHeaderSchema, "list_headers");
export default ListHeader;
//# sourceMappingURL=listHeaderModel.js.map