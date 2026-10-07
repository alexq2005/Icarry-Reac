/*------------------------------------------------------------*/
/*                     cabecera del sitio                       */
/*------------------------------------------------------------*/
/* Cabecera con el logo y el menu. Se muestra en todas las paginas
   porque esta fuera del Routes en App.jsx.
   Es sticky: queda fijo arriba al hacer scroll. */

import { Nav } from "../Nav/Nav"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import "./Header.css"

export const Header = () => {
    return (
        <header>
            {/* Logo vuelve al inicio */}
            <Link to={"/"}>
                <img src={logo} alt="iCarry" />
            </Link>

            <Nav />
        </header>
    )
}
