// recibe los productos y arma la grilla de tarjetas.

import { Item } from "../Item/Item"
import { Link } from "react-router-dom"
import "./ItemList.css"

export const ItemList = ({ products }) => {
    if (!products.length) {
        return <p>No hay productos</p>
    }

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
