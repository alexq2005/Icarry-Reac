/*------------------------------------------------------------*/
/*                     punto de entrada                         */
/*------------------------------------------------------------*/
/* Aca arranca todo: tomo el div #root del index.html y monto la app.
   BrowserRouter habilita las rutas; CartProvider comparte el carrito. */

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext.jsx"

/*------------------------------------------------------------*/
/*                     arbol de providers                       */
/*------------------------------------------------------------*/
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
