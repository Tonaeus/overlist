import { Schema, model } from "mongoose";
const directorySchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    }
}, { timestamps: true });
const Directory = model("Directory", directorySchema, "directories");
export default Directory;
//# sourceMappingURL=directoryModel.js.map