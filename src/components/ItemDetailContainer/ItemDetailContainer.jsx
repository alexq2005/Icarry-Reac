// busca un solo producto por el id de la url y se lo pasa a ItemDetail.
// es parecido a ItemListContainer pero en vez de traer todos, busca uno solo.
//
// tiene 3 estados:
//   - itemDetail: el producto encontrado (null si no lo encontro todavia)
//   - error: mensaje si no se encuentra o falla el fetch
//   - loading: true mientras busca

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => {
  // useParams() saca el :id de la url. ej: /product/3 → id = "3"
  const { id } = useParams();

  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // cada vez que cambia el id (porque navegas a otro producto), se vuelve a ejecutar
  useEffect(() => {
    // reseteo los estados por si vengo de otro producto
    setItemDetail(null);
    setLoading(true);
    setError(null);

    // traigo todos los productos y busco el que coincida con el id
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        // el id de la url es texto ("3") y en el json es numero (3),
        // por eso uso String() para comparar
        const item = data.find((product) => String(product.id) === id);
        if (!item) throw new Error("Producto no encontrado");
        setItemDetail(item);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]); // ← el id en el array hace que se re-ejecute si cambias de producto

  // renderizado condicional: primero loading, despues error, despues el contenido
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!itemDetail) return <p>Producto no encontrado</p>;

  return (
    <section>
      <h1 className="text-secondary">Detalles del producto</h1>
      {/* le paso el producto encontrado a ItemDetail para que lo muestre */}
      <ItemDetail item={itemDetail} />
    </section>
  );
};
