/* Recorro los productos del carrito y muestro una tarjeta para cada uno. */

import { useCart } from "../../context/CartContext"
import { CartItem } from "./CartItem"

export const CartList = () => {
    const { cart } = useCart()

    return (
        /* Uso este contenedor para acomodar las tarjetas del carrito. */
        <div className="cart-items-container">
            {cart.map((element) => (
                <CartItem item={element} key={element.id} />
            ))}
        </div>
    )
}