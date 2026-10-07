/* Este es el punto donde inicio la aplicación de React. */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext.jsx"

/* Envuelvo la app con el router y el proveedor para poder usar el carrito en todas las páginas. */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)