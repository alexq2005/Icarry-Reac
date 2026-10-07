/*------------------------------------------------------------*/
/*                     vista del carrito                       */
/*------------------------------------------------------------*/
/* Pagina /cart: si hay productos muestra lista + resumen;
   si esta vacio, invita a volver al catalogo. */

import { useCart } from "../../context/CartContext";

import "./Cart.css";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { Link } from "react-router-dom";

export const CartView = () => {
    // Lee los productos compartidos por CartContext.
    const{cart}=useCart();

    return(
        <section className="cart-container">    
        <h1>Tu carrito de compras</h1>   
        
        {cart.length ?(
            <>
            {/* Con productos: listado + total / checkout */}
            <CartList />
            <CartSummary />

            </>
        ):(
            <>
            {/* Sin productos: mensaje y enlace al inicio */}
            <p className="empty-cart">El carrito está vacío 😕</p>
            <Link className="btn bg-primary" to={"/"}>
            Volver
            </Link>
        
            </>
        )}        
        </section>    
    );
            
};
