import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { SanityProvider } from "./sanity/SanityProvider";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <SanityProvider>
        <App />
      </SanityProvider>
    </HelmetProvider>
  </StrictMode>
);
