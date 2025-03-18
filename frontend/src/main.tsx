import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { SideBarContextProvider } from "./contexts/SideBarContext.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthContextProvider>
			<SideBarContextProvider>
				<App />
			</SideBarContextProvider>
		</AuthContextProvider>
	</StrictMode>
);
