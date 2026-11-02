/* Esta tarjeta muestra los datos de un producto y recibe una acción como children. */

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
      {/* Muestro la categoría si el producto tiene una. */}
      {categoryLabel && <span className="category-chip">{categoryLabel}</span>}
      {/* Acá muestro la imagen, el nombre, la descripción y el precio. */}
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="card-precio">{formatPrice(price)}</p>
      {/* Cada pantalla puede agregar acá su propio botón o enlace. */}
      {children}
    </article>
  );
};
