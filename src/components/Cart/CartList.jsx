import{useCart}from "../../context/CartContext";
import{ CartItem } from "./CartItem";

// Renderiza un componente CartItem por cada producto del contexto.
export const CartList = () => {
    // Obtiene los productos guardados en el carrito.
    const {cart}=useCart();

    return(
        <div className="cart-items-container">
            {/* La id identifica cada elemento de forma única para React. */}
            {cart.map((element) => (
                <CartItem item={element} key={element.id} />
            ))}
        </div>
    )
};
