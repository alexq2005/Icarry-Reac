/* Muestro los productos en tarjetas y cada tarjeta lleva a su detalle. */

import { Item } from "../Item/Item"
import { Link } from "react-router-dom"
import "./ItemList.css"

export const ItemList = ({ products }) => {
    /* Si no hay productos para mostrar, aviso con este mensaje. */
    if (!products.length) {
        return <p>No hay productos</p>
    }

    /* Recorro los productos y creo una tarjeta para cada uno. */
    return (
        <div className="products-container">
            {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                    <Item {...product}>
                        <span className="btn bg-primary text-dark">Ver detalle</span>
                    </Item>
                </Link>
            ))}
        </div>
    )
}