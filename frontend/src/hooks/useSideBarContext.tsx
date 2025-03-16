import { useContext } from "react";
import { SideBarContext } from '../contexts/SideBarContext';

const useSideBarContext = () => {
  const context = useContext(SideBarContext);

  if (!context) {
    throw Error(
      "useSideBarContext must be used inside a SideBarContextProvider."
    );
  }

  return context;
};

export default useSideBarContext;
