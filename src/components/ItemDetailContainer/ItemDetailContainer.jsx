/* Busco el producto usando el id de la URL y después muestro su detalle. */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";

export const ItemDetailContainer = () => {
  /* Leo el id de la URL y guardo el resultado de la búsqueda. */
  const { id } = useParams();
  const [result, setResult] = useState(null);

  /* Consulto Firestore para encontrar el producto solicitado. */
  useEffect(() => {
    let cancelled = false;

    getProductById(id)
      .then((item) => {
        if (!cancelled) setResult({ id, item, error: null });
      })
      .catch((error) => {
        if (!cancelled) {
          setResult({ id, item: null, error: error.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* Mientras carga o si ocurre un error, muestro un mensaje. */
  if (!result || result.id !== id) {
    return (
      <section className="detail-page">
        <p>Cargando...</p>
      </section>
    );
  }
  if (result.error) {
    return (
      <section className="detail-page">
        <p>{result.error}</p>
      </section>
    );
  }
  if (!result.item) {
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
      <ItemDetail item={result.item} />
    </section>
  );
};
