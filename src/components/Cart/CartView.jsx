/* Muestro los productos del carrito o una invitación a volver al catálogo. */

import { useCart } from "../../context/CartContext"
import "./Cart.css"
import { CartList } from "./CartList"
import { CartSummary } from "./CartSummary"
import { Link } from "react-router-dom"

export const CartView = () => {
    const { cart } = useCart()

    return (
        <section className="cart-container">
            <h1>Tu carrito de compras</h1>

            {cart.length ? (
                <>
                    {/* Si hay productos, muestro la lista y el total. */}
                    <CartList />
                    <CartSummary />
                </>
            ) : (
                /* Si no hay productos, muestro este mensaje. */
                <div className="empty-cart-state">
                    <p className="empty-cart" role="status">
                        El carrito está vacío
                    </p>
                    <p className="empty-cart-hint">
                        Explorá el catálogo o elegí una categoría y sumá tus favoritos.
                    </p>
                    {/* Dejo accesos para volver al catálogo o ver una categoría. */}
                    <div className="empty-cart-actions">
                        <Link className="btn bg-primary empty-cart-cta" to="/">
                            Volver al catálogo
                        </Link>
                        <Link
                            className="btn btn-outline empty-cart-cta"
                            to="/category/items-del-juego"
                        >
                            Items del juego
                        </Link>
                        <Link
                            className="btn btn-outline empty-cart-cta"
                            to="/category/merchandising"
                        >
                            Merchandising
                        </Link>
                    </div>
                </div>
            )}
        </section>
    )
}