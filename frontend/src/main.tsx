// Dependencies
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Styles
import "./index.css";

// Components
import { App } from "./App";

/**
 * Main component that renders the entire application.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
