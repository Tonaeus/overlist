import { Schema, model } from "mongoose";
const rowSchema = new Schema({}, { strict: false });
const listBodySchema = new Schema({
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
const ListBody = model("ListBody", listBodySchema, "list_bodies");
export default ListBody;
//# sourceMappingURL=listBodyModel.js.map