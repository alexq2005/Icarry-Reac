// cabecera con el logo y el menu. se muestra en todas las paginas
// porque esta fuera del Routes en App.jsx.
// es sticky asi que queda fijo arriba al hacer scroll.

import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Header.css";

export const Header = () => {
  // el logo es un Link que te lleva al inicio ("/")
  // Nav es el menu con los links de navegacion
  return (
    <header>
      {/* logo a la izquierda, clickeable para volver al inicio */}
      <div className="div-logo">
        <Link className="logo" to={"/"}>
          <img src={logo} alt="iCarry" className="logo-img" />
        </Link>
      </div>

      {/* menu de navegacion a la derecha */}
      <Nav />
    </header>
  );
};
