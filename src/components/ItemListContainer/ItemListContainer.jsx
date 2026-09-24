// este es el que trae los productos del json y se los pasa a ItemList.
// lo uso para la pagina de inicio ("/") y para "/category/:category"
// (aunque el filtro por categoria todavia no esta implementado, muestra todos).
//
// tiene 3 estados:
//   - products: el array de productos que viene del json
//   - errors: si algo sale mal con el fetch, guardo el mensaje aca
//   - loading: true mientras se estan cargando los datos

import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";

export const ItemListContainer = () => {
  // estado para los productos, errores y carga
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect con [] vacio = se ejecuta una sola vez cuando el componente se monta.
  // adentro hago el fetch al json que esta en public/data/products.json
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        // si la respuesta no es ok (404, 500, etc) tiro error
        if (!res.ok) {
          throw new Error("Error al cargar los productos");
        }

        // convierto la respuesta a json
        return res.json();
      })
      // guardo los productos en el estado
      .then((data) => setProducts(data))
      // si algo falla, guardo el mensaje de error
      .catch((error) => setErrors(error.message))
      // pase lo que pase, ya no estoy cargando
      .finally(() => setLoading(false));
  }, []);

  // renderizado condicional: primero verifico si esta cargando o si hay error
  if (loading) return <p>Cargando...</p>;
  if (errors) return <p>{errors}</p>;

  // si llego aca es porque los productos se cargaron bien
  return (
    <section className="seccion-productos">
      {/* titulo de bienvenida */}
      <h1 className="titulo-home text-secondary">Bienvenidos a la tienda</h1>

      <p className="parrafo">
        En iCarry encontrarás los items más buscados de Dota 2: Arcanas,
        Personas, sets inmortal y bundles exclusivos. Trade verificados,
        entrega inmediata y los mejores precios del mercado para mejorar tu
        colección sin vueltas.
      </p>

      {/* subtitulo y grilla de productos */}
      <h2>Nuestros productos</h2>
      <ItemList products={products} />
    </section>
  );
};
