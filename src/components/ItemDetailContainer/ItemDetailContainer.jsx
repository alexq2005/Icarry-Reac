/* -------------------------------------------------------------------------- */
/*   BUSCO EL PRODUCTO USANDO EL ID DE LA URL Y DESPUÉS MUESTRO SU DETALLE    */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";

export const ItemDetailContainer = () => {
  /* -------------------------------------------------------------------------- */
  /*       LEO EL ID DE LA URL Y GUARDO EL PRODUCTO, EL ERROR Y LA CARGA        */
  /* -------------------------------------------------------------------------- */
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevId, setPrevId] = useState(id);

  /* -------------------------------------------------------------------------- */
  /*           SI CAMBIA EL ID, REINICIO LOS ESTADOS ANTES DE BUSCAR            */
  /*                 (DURANTE EL RENDER, COMO RECOMIENDA REACT)                 */
  /* -------------------------------------------------------------------------- */
  if (id !== prevId) {
    setPrevId(id);
    setItemDetail(null);
    setLoading(true);
    setError(null);
  }

  /* -------------------------------------------------------------------------- */
  /*          CONSULTO FIRESTORE PARA ENCONTRAR EL PRODUCTO SOLICITADO          */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  /* -------------------------------------------------------------------------- */
  /*          MIENTRAS CARGA O SI OCURRE UN ERROR, MUESTRO UN MENSAJE           */
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
  /*            CUANDO ENCUENTRO EL PRODUCTO, MUESTRO SU INFORMACIÓN            */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="detail-page">
      {/* -------------------------------------------------------------------------- */}
      {/*                EN LA PESTAÑA MUESTRO EL NOMBRE DEL PRODUCTO                */}
      {/* -------------------------------------------------------------------------- */}
      <Helmet>
        <title>{`${itemDetail.name} | iCarry`}</title>
      </Helmet>
      <h1 className="titulo-dorado">Detalles del producto</h1>
      <ItemDetail item={itemDetail} />
    </section>
  );
};
