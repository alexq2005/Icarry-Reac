/* Cargo el catálogo y, si hay una categoría en la URL, filtro los productos. */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getByCategory } from "../../services/productsService";
import "./ItemListContainer.css";

/* Acá guardo el título y la descripción de cada categoría. */
const categoryInfo = {
  "items-del-juego": {
    title: "Items del juego",
    description:
      "Equipá a tus héroes con artículos únicos: Arcanas, Personas, tesoros inmortales y bundles con efectos especiales. Elegí tus favoritos y llevá tu colección al siguiente nivel.",
  },
  merchandising: {
    title: "Merchandising",
    description:
      "La batalla no termina cuando cae el Ancient: llevá tu pasión al mundo real con figuras, remeras, pósteres y otros productos para fans. Encontrá artículos para tu colección, tu espacio de juego o para hacer un regalo.",
  },
};

export const ItemListContainer = () => {
  /* Leo la categoría de la URL y guardo el resultado de la consulta. */
  const { category } = useParams();
  const [result, setResult] = useState(null);

  /* Consulto los productos y filtro por categoría cuando corresponde. */
  useEffect(() => {
    let cancelled = false;

    getByCategory(category)
      .then((data) => {
        if (!cancelled) {
          setResult({ category, products: data, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setResult({ category, products: [], error: error.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  /* Mientras carga o si ocurre un error, muestro un mensaje. */
  if (!result || result.category !== category) return <p>Cargando...</p>;
  if (result.error) return <p>{result.error}</p>;

  const currentCategory = category ? categoryInfo[category] : null;

  return (
    <section className="seccion-productos">
      {/* Esta presentación aparece solamente en la página de inicio. */}
      {!category && (
        <>
          <div className="introduccion-tienda">
            <span className="etiqueta-seccion">Mercado de coleccionistas</span>
            <h1 className="titulo-home text-secondary">
              Bienvenidos a la tienda
            </h1>
            <p className="parrafo parrafo-lead">
              En iCarry se juntan las leyendas: un mercado para coleccionistas
              de Dota 2 donde cada hallazgo es una victoria.
            </p>
            <p className="parrafo parrafo-cuerpo">
              Explorá el catálogo completo: encontrá artículos digitales para tu
              inventario y productos para llevar Dota 2 al mundo real. Descubrí
              tus favoritos y armá tu colección.
            </p>
          </div>

          <div className="encabezado-productos">
            <span className="linea-encabezado" aria-hidden="true" />
            <h2>Nuestros productos</h2>
            <span className="linea-encabezado" aria-hidden="true" />
          </div>
        </>
      )}

      {/* Si elegí una categoría, muestro su título y descripción. */}
      {currentCategory && (
        <div className="introduccion-tienda">
          <h1 className="titulo-home text-secondary">
            {currentCategory.title}
          </h1>
          <p className="parrafo">{currentCategory.description}</p>
        </div>
      )}

      {/* Para una categoría sin descripción, muestro el nombre recibido. */}
      {category && !currentCategory && (
        <div className="encabezado-productos">
          <span className="linea-encabezado" aria-hidden="true" />
          <h2>{category}</h2>
          <span className="linea-encabezado" aria-hidden="true" />
        </div>
      )}
      {/* Muestro acá las tarjetas de los productos. */}
      <ItemList products={result.products} />
    </section>
  );
};
