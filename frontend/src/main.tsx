// Dependencies
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

// Styles
import "./index.css";

// Components
import { App } from "./App";

/**
 * Main component that renders the entire application.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
