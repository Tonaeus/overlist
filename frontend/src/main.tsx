import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { DirectoriesContextProvider } from "./contexts/DirectoriesContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<DirectoriesContextProvider>
			<App />
		</DirectoriesContextProvider>
	</StrictMode>
);
