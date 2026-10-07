/*------------------------------------------------------------*/
/*                     menu de navegacion                      */
/*------------------------------------------------------------*/
/* Links principales del sitio.
   Usa Link de react-router-dom (no <a>) para navegar sin recargar (SPA). */

import { Link } from "react-router-dom"
import { CartWidget } from "../CartWidget/CartWidget"
import "./Nav.css"

export const Nav = () => {
    return (
        <nav>
            <ul className="nav-list">
                {/*----- enlaces de catalogo -----*/}
                <li>
                    <Link to={"/"}>Inicio</Link>
                </li>
                <li>
                    <Link to={"/category/items-del-juego"}>Items del juego</Link>
                </li>
                <li>
                    <Link to={"/category/merchandising"}>Merchandising</Link>
                </li>
                {/*----- acceso al carrito -----*/}
                <li>
                    <Link to={"/cart"}>
                        <CartWidget />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
