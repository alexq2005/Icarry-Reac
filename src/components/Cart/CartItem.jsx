/* Muestro un producto del carrito y agrego el botón para eliminarlo. */

import { useCart } from "../../context/CartContext"
import { Item } from "../Item/Item"

export const CartItem = ({ item }) => {
    const { removeItem } = useCart()

    return (
        <Item {...item}>
            {/* Con este botón saco el producto del carrito. */}
            <button
                className="btn bg-delete primary"
                onClick={() => removeItem(item.id)}
            >
                Eliminar
            </button>
        </Item>
    )
}