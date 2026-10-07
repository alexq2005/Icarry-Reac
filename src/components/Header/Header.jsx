/* Muestro el logo y el menú en la cabecera de todas las páginas. */

import { Nav } from "../Nav/Nav"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import "./Header.css"

export const Header = () => {
    return (
        <header>
            {/* Al hacer clic en el logo vuelvo al inicio. */}
            <Link to={"/"}>
                <img src={logo} alt="iCarry" />
            </Link>

            {/* Acá están los enlaces principales del sitio. */}
            <Nav />
        </header>
    )
}