import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { SideBarContextProvider } from "./contexts/SideBarContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SideBarContextProvider>
			<App />
		</SideBarContextProvider>
	</StrictMode>
);
