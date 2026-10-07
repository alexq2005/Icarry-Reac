/*------------------------------------------------------------*/
/*                     widget del carrito                      */
/*------------------------------------------------------------*/
/* Icono/texto del carrito con badge de cantidad.
   Se usa dentro de Nav.jsx; el badge solo aparece si hay items. */

import { useCart } from "../../context/CartContext"

export const CartWidget = () => {
    // Consulta la cantidad actual para mostrarla junto al enlace del carrito.
    const { getTotalItems } = useCart()
    const totalItems = getTotalItems()
    return (
        <span className="cart-widget">
            Carrito
            {/* Badge: oculto cuando el carrito esta vacio */}
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
        </span>
    )
}
