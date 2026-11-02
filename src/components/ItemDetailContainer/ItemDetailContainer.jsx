/* Busco el producto usando el id de la URL y después muestro su detalle. */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";

export const ItemDetailContainer = () => {
  /* Leo el id de la URL y guardo el producto, el error y la carga. */
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevId, setPrevId] = useState(id);

  /* Si cambia el id, reinicio los estados antes de buscar (durante el render, como recomienda React). */
  if (id !== prevId) {
    setPrevId(id);
    setItemDetail(null);
    setLoading(true);
    setError(null);
  }

  /* Consulto Firestore para encontrar el producto solicitado. */
  useEffect(() => {
    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  /* Mientras carga o si ocurre un error, muestro un mensaje. */
  if (loading) {
    return (
      <section className="detail-page">
        <p>Cargando...</p>
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

  /* Cuando encuentro el producto, muestro su información. */
  return (
    <section className="detail-page">
      <h1 className="text-secondary">Detalles del producto</h1>
      <ItemDetail item={itemDetail} />
    </section>
  );
};
