/* -------------------------------------------------------------------------- */
/*            ESTE ES EL PUNTO DONDE INICIO LA APLICACIÓN DE REACT            */
/* -------------------------------------------------------------------------- */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* -------------------------------------------------------------------------- */
/*            BOOTSTRAP PRIMERO, ASI MIS ESTILOS QUEDAN POR ENCIMA            */
/* -------------------------------------------------------------------------- */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FondoAnimado } from "./components/FondoAnimado/FondoAnimado.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FondoAnimado />
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
