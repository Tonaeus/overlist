// import SideBarButton from "./SideBarButton";
// import SideBarBlock from "./SideBarBlock";

// import useModal from "../hooks/useModal";
// import Modal from "./Modal";
// import ModalContentInput from "./ModalContentInput";
// import ModalContentText from "./ModalContentText";

const ListSideBar = () => {
  return (
    <>
    <div className="flex flex-col h-full">
      {/* <SideBarButton
        label="Add Directory"
        onClick={(e) => {
          handleAdd(e);
        }}
      /> */}
      <div className="flex-1 overflow-y-auto">
        {/* {directories.map((directory: Directory) => (
          <SideBarBlock
            key={directory.id}
            object={directory}
            label={label}
            to={`/directory/${directory.label}`}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))} */}
      </div>
    </div>

    {/* <Modal {...modalProps} /> */}
  </>
  )
}

export default ListSideBar