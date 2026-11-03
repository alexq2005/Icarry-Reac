import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

export const NotFound = () => {
  return (
    <section id="center">
      {/* -------------------------------------------------------------------------- */}
      {/*                MUESTRO EL LOGO CENTRADO ARRIBA DEL MENSAJE                 */}
      {/* -------------------------------------------------------------------------- */}
      <div className="hero">
        <img className="base" src={logo} alt="iCarry" />
      </div>

      <h2>Página no encontrada</h2>
      <p>La página que buscás no existe.</p>

      {/* -------------------------------------------------------------------------- */}
      {/*               USO LA REGLA .COUNTER PARA EL BOTÓN DE VOLVER                */}
      {/* -------------------------------------------------------------------------- */}
      <Link className="counter" to="/">
        Volver al inicio
      </Link>
    </section>
  );
};
