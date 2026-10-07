/*------------------------------------------------------------*/
/*                     tarjeta de producto                     */
/*------------------------------------------------------------*/
/* Tarjeta reutilizable: listado, detalle y carrito.
   El boton/accion de abajo llega por children porque en cada
   pantalla es distinto (Ver detalle / Agregar / Eliminar). */

import "./Item.css"

/*----- formateo de precio (ARS) -----*/
const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value))

export const Item = ({ name, price, image, description, children }) => {
    return (
        <article className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="card-precio">{formatPrice(price)}</p>
            {children}
        </article>
    )
}
