// aca arranca todo: agarro el div "root" del index.html y meto la app adentro

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// el router es lo que me deja tener varias paginas sin recargar.
// StrictMode es de React, me avisa si algo esta mal (solo en desarrollo, en produccion no hace nada).
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
