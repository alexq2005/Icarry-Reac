/* -------------------------------------------------------------------------- */
/* CARGO EL CATÁLOGO Y, SI HAY UNA CATEGORÍA EN LA URL, FILTRO LOS PRODUCTOS  */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ItemList } from "../ItemList/ItemList";
import { getByCategory } from "../../services/productsService";
import "./ItemListContainer.css";

/* -------------------------------------------------------------------------- */
/*          ACÁ GUARDO EL TÍTULO Y LA DESCRIPCIÓN DE CADA CATEGORÍA           */
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
  /*   LEO LA CATEGORÍA DE LA URL Y GUARDO LOS PRODUCTOS, EL ERROR Y LA CARGA   */
  /* -------------------------------------------------------------------------- */
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevCategory, setPrevCategory] = useState(category);

  /* -------------------------------------------------------------------------- */
  /*          SI CAMBIA LA CATEGORÍA, REINICIO LOS ESTADOS DE CARGA Y           */
  /*              ERROR (DURANTE EL RENDER, COMO RECOMIENDA REACT)              */
  /* -------------------------------------------------------------------------- */
  if (category !== prevCategory) {
    setPrevCategory(category);
    setLoading(true);
    setErrors(null);
  }

  /* -------------------------------------------------------------------------- */
  /*      CONSULTO LOS PRODUCTOS Y FILTRO POR CATEGORÍA CUANDO CORRESPONDE      */
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
      {/*             CAMBIO EL TITULO DE LA PESTAÑA SEGUN LA CATEGORIA              */}
      {/* -------------------------------------------------------------------------- */}
      <Helmet>
        <title>{currentCategory ? `${currentCategory.title} | iCarry` : "iCarry — Tienda Dota 2"}</title>
      </Helmet>
      {/* -------------------------------------------------------------------------- */}
      {/*         ESTA PRESENTACIÓN APARECE SOLAMENTE EN LA PÁGINA DE INICIO         */}
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
      {/*          SI ELEGÍ UNA CATEGORÍA, MUESTRO SU TÍTULO Y DESCRIPCIÓN           */}
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
      {/*       PARA UNA CATEGORÍA SIN DESCRIPCIÓN, MUESTRO EL NOMBRE RECIBIDO       */}
      {/* -------------------------------------------------------------------------- */}
      {category && !currentCategory && (
        <div className="encabezado-productos">
          <span className="linea-encabezado" aria-hidden="true" />
          <h2>{category}</h2>
          <span className="linea-encabezado" aria-hidden="true" />
        </div>
      )}
      {/* -------------------------------------------------------------------------- */}
      {/*              MIENTRAS CARGA O SI OCURRE UN ERROR, MUESTRO UN               */}
      {/*                      MENSAJE EN LUGAR DE LAS TARJETAS                      */}
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
