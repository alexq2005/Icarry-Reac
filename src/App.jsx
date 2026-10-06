/*------------------------------------------------------------*/
/*                     estructura principal                     */
/*------------------------------------------------------------*/
// armo la pagina: header arriba, footer abajo y en el medio va cambiando segun la ruta.

import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer"
import {CartView} from "./components/Cart/CartView"

// Define la estructura común de la aplicación y sus rutas.
function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          {/* Página para consultar y gestionar el carrito. */}
          <Route path="/cart" element={<CartView />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          {/*opcional:filtro por categoria */}
          <Route path="/category/:category" element={<ItemListContainer />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App
