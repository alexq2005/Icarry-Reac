/* -------------------------------------------------------------------------- */
/*  MUESTRO LOS PRODUCTOS DEL CARRITO O UNA INVITACIÓN A VOLVER AL CATÁLOGO   */
/* -------------------------------------------------------------------------- */

import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const CartView = () => {
  const { cart } = useCart();

  return (
    <section className="cart-container">
      <Helmet>
        <title>Carrito | iCarry</title>
      </Helmet>
      <h1>Tu carrito de compras</h1>

      {cart.length ? (
        <>
          {/* -------------------------------------------------------------------------- */}
          {/*               SI HAY PRODUCTOS, MUESTRO LA LISTA Y EL TOTAL                */}
          {/* -------------------------------------------------------------------------- */}
          <CartList />
          <CartSummary />
        </>
      ) : (
        /* -------------------------------------------------------------------------- */
        /*                 SI NO HAY PRODUCTOS, MUESTRO ESTE MENSAJE                  */
        /* -------------------------------------------------------------------------- */
        <div className="empty-cart-state">
          <p className="empty-cart" role="status">
            El carrito está vacío
          </p>
          <p className="empty-cart-hint">
            Explorá el catálogo o elegí una categoría y sumá tus favoritos.
          </p>
          {/* -------------------------------------------------------------------------- */}
          {/*          DEJO ACCESOS PARA VOLVER AL CATÁLOGO O VER UNA CATEGORÍA          */}
          {/* -------------------------------------------------------------------------- */}
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
  );
};
