/*------------------------------------------------------------*/
/*                     estructura principal                     */
/*------------------------------------------------------------*/
/* Armo la pagina: Header arriba, Footer abajo y en el medio
   el contenido cambia segun la ruta (SPA con React Router). */

import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer"
import {CartView} from "./components/Cart/CartView"

function App() {
  return (
    <>
      {/* Layout fijo: no depende de la ruta */}
      <Header />

      {/* Rutas de la app: catalogo, carrito, detalle y filtro por categoria */}
      <main>
        <Routes>
          {/* Catalogo completo */}
          <Route path="/" element={<ItemListContainer />} />
          {/* Pagina para consultar y gestionar el carrito */}
          <Route path="/cart" element={<CartView />} />
          {/* Detalle de un producto por id */}
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          {/* Filtro opcional por categoria (reusa ItemListContainer) */}
          <Route path="/category/:category" element={<ItemListContainer />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App
