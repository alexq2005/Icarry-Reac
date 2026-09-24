// menu de navegacion con los links de la pagina.
// usa Link de react-router-dom en vez de <a> para que no recargue la pagina
// (navega sin hacer request al servidor, es una SPA)

import { Link } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  // por ahora solo tiene Inicio y Carrito.
  // mas adelante se pueden agregar links de categorias
  return (
    <nav className="header-nav">
      <ul>
        {/* link al inicio: muestra todos los productos */}
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>

        {/* link al carrito (todavia sin funcionalidad completa) */}
        <li>
          <Link to={"/cart"}>Carrito 🛒</Link>
        </li>
      </ul>
    </nav>
  );
};
