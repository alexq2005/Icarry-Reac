// la tarjeta de un producto. la uso en el listado y en el detalle,
// y el boton de abajo lo mando por children porque en cada lugar es distinto.
//
// props que recibe:
//   - name: nombre del producto
//   - price: precio
//   - image: url de la imagen (viene de imgbb)
//   - description: descripcion corta del producto
//   - children: contenido variable (boton "Ver detalle" o "Agregar al carrito")

import "./Item.css";

export const Item = ({ name, price, image, description, children }) => {
  return (
    <article className="card">
      {/* imagen del producto */}
      <img src={image} alt={name} />

      {/* nombre en dorado */}
      <h3>{name}</h3>

      {/* descripcion del producto */}
      <p>{description}</p>

      {/* precio con formato $xx.xx */}
      <p className="card-precio">Precio: ${price}</p>

      {/* aca va el boton que cambia segun donde se use:
          - en el listado: "Ver detalle" (un span que parece boton)
          - en el detalle: "Agregar al carrito" (un button real) */}
      {children}
    </article>
  );
};
