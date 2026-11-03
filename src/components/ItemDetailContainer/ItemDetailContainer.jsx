/* -------------------------------------------------------------------------- */
/*                   BUSCO EL PRODUCTO POR EL ID DE LA URL                    */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";

export const ItemDetailContainer = () => {
  /* -------------------------------------------------------------------------- */
  /*                           ID DE LA URL Y ESTADOS                           */
  /* -------------------------------------------------------------------------- */
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevId, setPrevId] = useState(id);

  /* -------------------------------------------------------------------------- */
  /*                    SI CAMBIA EL ID REINICIO LOS ESTADOS                    */
  /* -------------------------------------------------------------------------- */
  if (id !== prevId) {
    setPrevId(id);
    setItemDetail(null);
    setLoading(true);
    setError(null);
  }

  /* -------------------------------------------------------------------------- */
  /*                       TRAIGO EL PRODUCTO DE FIREBASE                       */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  /* -------------------------------------------------------------------------- */
  /*                     MENSAJE MIENTRAS CARGA O SI FALLA                      */
  /* -------------------------------------------------------------------------- */
  if (loading) {
    return (
      <section className="detail-page">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="detail-page">
        <p>{error}</p>
      </section>
    );
  }
  if (!itemDetail) {
    return (
      <section className="detail-page">
        <p>Producto no encontrado</p>
      </section>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                            MUESTRO EL PRODUCTO                             */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="detail-page">
      {/* -------------------------------------------------------------------------- */}
      {/*                     NOMBRE DEL PRODUCTO EN LA PESTANA                      */}
      {/* -------------------------------------------------------------------------- */}
      <Helmet>
        <title>{`${itemDetail.name} | iCarry`}</title>
      </Helmet>
      <h1 className="titulo-dorado">Detalles del producto</h1>
      <ItemDetail item={itemDetail} />
    </section>
  );
};
