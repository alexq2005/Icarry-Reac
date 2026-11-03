/* En este menú puedo ir al inicio, a las categorías o al carrito. */

import { NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../../context/CartContext";
import "./Nav.css";

const linkClass = ({ isActive }) =>
  isActive ? "nav-link is-active" : "nav-link";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav>
      <ul className="nav-list">
        {/* Estos enlaces sirven para recorrer las páginas de productos. */}
        <li>
          <NavLink to="/" end className={linkClass}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/items-del-juego" className={linkClass}>
            Items del juego
          </NavLink>
        </li>
        <li>
          <NavLink to="/category/merchandising" className={linkClass}>
            Merchandising
          </NavLink>
        </li>
        {/* Desde acá también puedo revisar el carrito. */}
        <li>
          <NavLink to="/cart" className={linkClass} aria-label="Ir al carrito">
            <span className="cart-widget">
              <TiShoppingCart className="cart-icon" />
              Carrito
              {/* La cantidad solo aparece cuando el carrito tiene productos. */}
              {totalItems > 0 && <span className="incart">{totalItems}</span>}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
