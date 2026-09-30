/*------------------------------------------------------------*/
/*                     punto de entrada                         */
/*------------------------------------------------------------*/
// aca arranca todo: agarro el div "root" del index.html y meto la app adentro

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
