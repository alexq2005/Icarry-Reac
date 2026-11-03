/* -------------------------------------------------------------------------- */
/*                   MENU CON INICIO, CATEGORIAS Y CARRITO                    */
/* -------------------------------------------------------------------------- */

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
        {/* -------------------------------------------------------------------------- */}
        {/*                            LINKS A LAS PAGINAS                             */}
        {/* -------------------------------------------------------------------------- */}
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
        {/* -------------------------------------------------------------------------- */}
        {/*                              LINK AL CARRITO                               */}
        {/* -------------------------------------------------------------------------- */}
        <li>
          <NavLink to="/cart" className={linkClass} aria-label="Ir al carrito">
            <span className="cart-widget">
              <TiShoppingCart className="cart-icon" />
              Carrito
              {/* -------------------------------------------------------------------------- */}
              {/*                       CANTIDAD SOLO SI HAY PRODUCTOS                       */}
              {/* -------------------------------------------------------------------------- */}
              {totalItems > 0 && <span className="incart">{totalItems}</span>}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
