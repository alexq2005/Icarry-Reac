// la tarjeta de un producto. la uso en el listado y en el detalle,
// y el boton de abajo lo mando por children porque en cada lugar es distinto.

import "./Item.css"

export const Item = ({ name, price, image, description, children }) => {
    return (
        <article className="card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="card-precio">${price}</p>
            {children}
        </article>
    )
}
