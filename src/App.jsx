// armo la pagina: header arriba, footer abajo y en el medio va cambiando segun la ruta.
// es como el esqueleto de la app, lo que no cambia nunca (header y footer)
// y lo que si cambia (el contenido del medio) lo maneja Routes.

import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  // las rutas definen que componente se muestra segun la url:
  // "/" → todos los productos (inicio)
  // "/product/:id" → detalle de un producto (el :id es dinamico, viene de la url)
  // "/cart" → el carrito (por ahora solo un titulo, sin logica)
  // "/category/:category" → para filtrar por categoria (la ruta existe pero todavia no filtra)
  // si ninguna ruta coincide, no muestra nada (podriamos agregar un 404)
  return (
    <>
      {/* el header se muestra siempre, no importa en que pagina estes */}
      <Header />

      <main>
        <Routes>
          {/* pagina principal: lista de todos los productos */}
          <Route path="/" element={<ItemListContainer />} />

          {/* carrito: todavia no tiene logica, solo muestra un titulo */}
          <Route path="/cart" element={<h1>Carrito</h1>} />

          {/* detalle: el :id se obtiene con useParams() en el componente */}
          <Route path="/product/:id" element={<ItemDetailContainer />} />

          {/* opcional: filtro por categorias (pendiente de implementar) */}
          <Route path="/category/:category" element={<ItemListContainer />} />
        </Routes>
      </main>

      {/* el footer tambien se muestra siempre */}
      <Footer />
    </>
  );
}

export default App;
