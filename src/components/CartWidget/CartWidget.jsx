/* Muestro el acceso al carrito y la cantidad de productos si hay alguno. */

import { useCart } from "../../context/CartContext"

export const CartWidget = () => {
    const { getTotalItems } = useCart()
    const totalItems = getTotalItems()

    return (
        <span className="cart-widget">
            Carrito
            {/* La cantidad solo aparece cuando el carrito tiene productos. */}
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
        </span>
    )
}