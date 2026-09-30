/*------------------------------------------------------------*/
/*                     cabecera del sitio                       */
/*------------------------------------------------------------*/
// cabecera con el logo y el menu. se muestra en todas las paginas
// porque esta fuera del Routes en App.jsx.
// es sticky asi que queda fijo arriba al hacer scroll.

import { Nav } from "../Nav/Nav"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import "./Header.css"

export const Header = () => {
    return (
        <header>
            <Link to={"/"}>
                <img src={logo} alt="iCarry" />
            </Link>

            <Nav />
        </header>
    )
}
