/* -------------------------------------------------------------------------- */
/*                     TARJETA CON LOS DATOS DEL PRODUCTO                     */
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
      {/*                          CATEGORIA SOLO SI TIENE                           */}
      {/* -------------------------------------------------------------------------- */}
      {categoryLabel && <span className="category-chip">{categoryLabel}</span>}
      {/* -------------------------------------------------------------------------- */}
      {/*                    IMAGEN, NOMBRE, DESCRIPCION Y PRECIO                    */}
      {/* -------------------------------------------------------------------------- */}
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="card-precio">{formatPrice(price)}</p>
      {/* -------------------------------------------------------------------------- */}
      {/*                       ACA CADA PAGINA METE SU BOTON                        */}
      {/* -------------------------------------------------------------------------- */}
      {children}
    </article>
  );
};
