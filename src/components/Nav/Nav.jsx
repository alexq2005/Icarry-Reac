/* En este menú puedo ir al inicio, a las categorías o al carrito. */

import { NavLink } from "react-router-dom"
import { CartWidget } from "../CartWidget/CartWidget"
import "./Nav.css"

const linkClass = ({ isActive }) =>
    isActive ? "nav-link is-active" : "nav-link"

export const Nav = () => {
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
                        <CartWidget />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}