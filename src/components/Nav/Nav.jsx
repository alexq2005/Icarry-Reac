/*------------------------------------------------------------*/
/*                     menu de navegacion                      */
/*------------------------------------------------------------*/
// menu de navegacion con los links de la pagina.
// usa Link de react-router-dom en vez de <a> para que no recargue la pagina
// (navega sin hacer request al servidor, es una SPA)

import { Link } from "react-router-dom"
import { CartWidget } from "../CartWidget/CartWidget"
import "./Nav.css"

export const Nav = () => {
    return (
        <nav>
            <ul className="nav-list">
                <li>
                    <Link to={"/"}>Inicio</Link>
                </li>
                <li>
                    <Link to={"/category/items-del-juego"}>Items del juego</Link>
                </li>
                <li>
                    <Link to={"/category/merchandising"}>Merchandising</Link>
                </li>
                <li>
                    <Link to={"/cart"}>
                        <CartWidget />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}