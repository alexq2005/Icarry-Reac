/* -------------------------------------------------------------------------- */
/*              ESTA TARJETA MUESTRA LOS DATOS DE UN PRODUCTO Y               */
/*                      RECIBE UNA ACCIÓN COMO CHILDREN                       */
/* -------------------------------------------------------------------------- */

import "./Item.css";
import { CATEGORY_LABELS } from "../../utils/categoryLabels";
import { formatPrice } from "../../utils/formatPrice";

export const Item = ({
  name,
  price,
  image,
  description,
  category,
  children,
}) => {
  const categoryLabel = category ? CATEGORY_LABELS[category] || category : null;

  return (
    <article className="card">
      {/* -------------------------------------------------------------------------- */}
      {/*               MUESTRO LA CATEGORÍA SI EL PRODUCTO TIENE UNA                */}
      {/* -------------------------------------------------------------------------- */}
      {categoryLabel && <span className="category-chip">{categoryLabel}</span>}
      {/* -------------------------------------------------------------------------- */}
      {/*        ACÁ MUESTRO LA IMAGEN, EL NOMBRE, LA DESCRIPCIÓN Y EL PRECIO        */}
      {/* -------------------------------------------------------------------------- */}
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="card-precio">{formatPrice(price)}</p>
      {/* -------------------------------------------------------------------------- */}
      {/*          CADA PANTALLA PUEDE AGREGAR ACÁ SU PROPIO BOTÓN O ENLACE          */}
      {/* -------------------------------------------------------------------------- */}
      {children}
    </article>
  );
};
