import Directory from "../models/directoryModel.js";
const getDirectoryLabel = async (directory_id) => {
    if (!directory_id) {
        return "None";
    }
    const directory = await Directory.findById({ _id: directory_id });
    if (!directory) {
        throw new Error();
    }
    return directory.label;
};
const formatList = async (list) => {
    return {
        id: list._id,
        label: list.label,
        directory_label: await getDirectoryLabel(list.directory_id),
        created: list.createdAt,
        modified: list.updatedAt,
    };
};
export { formatList };
//# sourceMappingURL=listUtils.js.map