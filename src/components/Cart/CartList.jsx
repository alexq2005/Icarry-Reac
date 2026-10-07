/*------------------------------------------------------------*/
/*                     lista del carrito                       */
/*------------------------------------------------------------*/
/* Recorre el carrito del contexto y renderiza un CartItem por producto. */

import{useCart}from "../../context/CartContext";
import{ CartItem } from "./CartItem";

export const CartList = () => {
    // Obtiene los productos guardados en el carrito.
    const {cart}=useCart();

    return(
        <div className="cart-items-container">
            {/* key=id: React necesita identificar cada elemento de forma unica */}
            {cart.map((element) => (
                <CartItem item={element} key={element.id} />
            ))}
        </div>
    )
};
