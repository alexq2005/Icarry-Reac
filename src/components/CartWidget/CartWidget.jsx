/*------------------------------------------------------------*/
/*                     widget del carrito                      */
/*------------------------------------------------------------*/
// componente separado para el icono del carrito y el badge con la cantidad.
// se usa dentro de Nav.jsx

import { useCart } from "../../context/CartContext"

export const CartWidget = () => {
    const { getTotalItems } = useCart()
    const totalItems = getTotalItems()
    return (
        <span className="cart-widget">
            Carrito
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
        </span>
    )
}
