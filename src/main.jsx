/* Este es el punto donde inicio la aplicación de React. */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
