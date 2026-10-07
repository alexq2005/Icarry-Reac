/*------------------------------------------------------------*/
/*                     listado de productos                    */
/*------------------------------------------------------------*/
/* Recibe el array de productos y arma la grilla de tarjetas.
   Cada tarjeta enlaza al detalle (/product/:id). */

import { Item } from "../Item/Item"
import { Link } from "react-router-dom"
import "./ItemList.css"

export const ItemList = ({ products }) => {
    /*----- sin resultados -----*/
    if (!products.length) {
        return <p>No hay productos</p>
    }

    /*----- grilla -----*/
    return (
        <div className="products-container">
            {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id}>
                    <Item {...product}>
                        <span className="btn bg-primary text-dark">Ver detalle</span>
                    </Item>
                </Link>
            ))}
        </div>
    )
}
