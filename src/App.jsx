/* En este componente organizo las partes principales y las rutas de la tienda. */

import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer"
import { CartView } from "./components/Cart/CartView"

function App() {
  return (
    <>
      {/* Muestro la cabecera en todas las páginas. */}
      <Header />

      {/* Según la URL, muestro la página que corresponde. */}
      <main>
        <Routes>
          {/* Página principal con todos los productos. */}
          <Route path="/" element={<ItemListContainer />} />
          {/* Página del carrito. */}
          <Route path="/cart" element={<CartView />} />
          {/* Detalle de un producto específico. */}
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          {/* Lista los productos de una categoría. */}
          <Route path="/category/:category" element={<ItemListContainer />} />
        </Routes>
      </main>

      {/* El pie también aparece en todas las páginas. */}
      <Footer />
    </>
  )
}

export default App