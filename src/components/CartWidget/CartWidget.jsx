/* Muestro el acceso al carrito y la cantidad de productos si hay alguno. */

import { useCart } from "../../context/CartContext";

export const CartWidget = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <span className="cart-widget">
      {/* Dibujo un carrito chiquito para que se reconozca de un vistazo. */}
      <svg
        className="cart-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.1h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
      </svg>
      Carrito
      {/* La cantidad solo aparece cuando el carrito tiene productos. */}
      {totalItems > 0 && <span className="incart">{totalItems}</span>}
    </span>
  );
};
