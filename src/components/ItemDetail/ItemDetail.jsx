/*------------------------------------------------------------*/
/*                     detalle del producto                     */
/*------------------------------------------------------------*/
/* Vista de un producto individual: reusa Item y agrega
   el boton "Agregar al carrito" conectado al contexto. */

import { useCart } from "../../context/CartContext"
import { Item } from "../Item/Item"
import "./ItemDetail.css"

export const ItemDetail = ({ item }) => {
    const { addItem } = useCart()

    return (
        <div className="detail-wrapper">
            <Item {...item}>
                <button className="btn bg-primary text-dark" onClick={() => addItem(item)}>
                    Agregar al carrito
                </button>
            </Item>
        </div>
    )
}
