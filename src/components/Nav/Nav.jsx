/*------------------------------------------------------------*/
/*                     menu de navegacion                      */
/*------------------------------------------------------------*/
/* Links principales del sitio.
   Usa NavLink para marcar la ruta activa sin recargar (SPA). */

import { NavLink } from "react-router-dom"
import { CartWidget } from "../CartWidget/CartWidget"
import "./Nav.css"

const linkClass = ({ isActive }) =>
    isActive ? "nav-link is-active" : "nav-link"

export const Nav = () => {
    return (
        <nav>
            <ul className="nav-list">
                {/*----- enlaces de catalogo -----*/}
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
                {/*----- acceso al carrito -----*/}
                <li>
                    <NavLink to="/cart" className={linkClass} aria-label="Ir al carrito">
                        <CartWidget />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
