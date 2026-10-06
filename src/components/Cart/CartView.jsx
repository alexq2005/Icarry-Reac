import { useCart } from "../../context/CartContext";

import "./Cart.css";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { Link } from "react-router-dom";

// Página principal del carrito: muestra sus productos o el estado vacío.
export const CartView = () => {
    // Lee los productos compartidos por CartContext.
    const{cart}=useCart();

    return(
        // Si hay productos, presenta la lista y el resumen de compra.
        <section className="cart-container">    
        <h1>Tu carrito de compras</h1>   
        
        {cart.length ?(
            <>
            <CartList />
            <CartSummary />

            </>
        // Si no hay productos, permite volver al catálogo.
        ):(
            <>
            <p className="empty-cart"> Tu carrito está vacío</p>
            <Link className="btn btn-primary" to={"/"}>
            Volver
            </Link>
        
            </>
        )}        
        </section>    
    );
            
};