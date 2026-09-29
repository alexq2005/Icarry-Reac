/*------------------------------------------------------------*/
/*                     menu de navegacion                      */
/*------------------------------------------------------------*/
// menu de navegacion con los links de la pagina.
// usa Link de react-router-dom en vez de <a> para que no recargue la pagina
// (navega sin hacer request al servidor, es una SPA)

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Nav.css";

export const Nav = () => {
  /*------------------------------------------------------------*/
  /*                     estado del carrito en menu             */
  /*------------------------------------------------------------*/
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>

        <li>
          <Link to={"/cart"} >
          Carrito
          
            <span>Carrito</span>
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};