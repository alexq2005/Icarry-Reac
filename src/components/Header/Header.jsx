/* -------------------------------------------------------------------------- */
/*       MUESTRO EL LOGO Y EL MENÚ EN LA CABECERA DE TODAS LAS PÁGINAS        */
/* -------------------------------------------------------------------------- */

import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      {/* -------------------------------------------------------------------------- */}
      {/*                 AL HACER CLIC EN EL LOGO VUELVO AL INICIO                  */}
      {/* -------------------------------------------------------------------------- */}
      <Link to={"/"}>
        <img src={logo} alt="iCarry" />
      </Link>

      {/* -------------------------------------------------------------------------- */}
      {/*                ACÁ ESTÁN LOS ENLACES PRINCIPALES DEL SITIO                 */}
      {/* -------------------------------------------------------------------------- */}
      <Nav />
    </header>
  );
};
