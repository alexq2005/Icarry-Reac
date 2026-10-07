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
    const { cart } = useCart();

    return (
        <section className="cart-container">
            <h1>Tu carrito de compras</h1>

            {cart.length ? (
                <>
                    {/* Con productos: listado + total / checkout */}
                    <CartList />
                    <CartSummary />
                </>
            ) : (
                <div className="empty-cart-state">
                    <p className="empty-cart" role="status">
                        El carrito está vacío 😕
                    </p>
                    <p className="empty-cart-hint">
                        Explorá el catálogo y sumá tus favoritos.
                    </p>
                    <Link className="btn bg-primary empty-cart-cta" to="/">
                        Volver al catálogo
                    </Link>
                </div>
            )}
        </section>
    );
};
