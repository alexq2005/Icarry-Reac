/* -------------------------------------------------------------------------- */
/*                 CARGO LOS PRODUCTOS Y FILTRO POR CATEGORIA                 */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ItemList } from "../ItemList/ItemList";
import { getByCategory } from "../../services/productsService";
import "./ItemListContainer.css";

/* -------------------------------------------------------------------------- */
/*                      TITULO Y TEXTO DE CADA CATEGORIA                      */
/* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                       CATEGORIA DE LA URL Y ESTADOS                        */
  /* -------------------------------------------------------------------------- */
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevCategory, setPrevCategory] = useState(category);

  /* -------------------------------------------------------------------------- */
  /*                  SI CAMBIA LA CATEGORIA REINICIO LA CARGA                  */
  /* -------------------------------------------------------------------------- */
  if (category !== prevCategory) {
    setPrevCategory(category);
    setLoading(true);
    setErrors(null);
  }

  /* -------------------------------------------------------------------------- */
  /*                      CARGO LOS PRODUCTOS DE FIREBASE                       */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getByCategory(category)
      .then((data) => setProducts(data))
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  }, [category]);

  const currentCategory = category ? categoryInfo[category] : null;

  return (
    <section className="seccion-productos">
      {/* -------------------------------------------------------------------------- */}
      {/*                    TITULO DE LA PESTANA SEGUN CATEGORIA                    */}
      {/* -------------------------------------------------------------------------- */}
      <Helmet>
        <title>{currentCategory ? `${currentCategory.title} | iCarry` : "iCarry — Tienda Dota 2"}</title>
      </Helmet>
      {/* -------------------------------------------------------------------------- */}
      {/*                        BIENVENIDA SOLO EN EL INICIO                        */}
      {/* -------------------------------------------------------------------------- */}
      {!category && (
        <>
          <div className="introduccion-tienda">
            <span className="etiqueta-seccion">Mercado de coleccionistas</span>
            <h1 className="titulo-home">
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

      {/* -------------------------------------------------------------------------- */}
      {/*                   TITULO Y TEXTO DE LA CATEGORIA ELEGIDA                   */}
      {/* -------------------------------------------------------------------------- */}
      {currentCategory && (
        <div className="introduccion-tienda">
          <h1 className="titulo-home">
            {currentCategory.title}
          </h1>
          <p className="parrafo">{currentCategory.description}</p>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/*                      SIN TEXTO MUESTRO SOLO EL NOMBRE                      */}
      {/* -------------------------------------------------------------------------- */}
      {category && !currentCategory && (
        <div className="encabezado-productos">
          <span className="linea-encabezado" aria-hidden="true" />
          <h2>{category}</h2>
          <span className="linea-encabezado" aria-hidden="true" />
        </div>
      )}
      {/* -------------------------------------------------------------------------- */}
      {/*                         SPINNER, ERROR O LA LISTA                          */}
      {/* -------------------------------------------------------------------------- */}
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : errors ? (
        <p>{errors}</p>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
};
