import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

/* -------------------------------------------------------------------------- */
/*                                 PAGINA 404                                 */
/* -------------------------------------------------------------------------- */
export const NotFound = () => {
  return (
    <section id="center">
      {/* -------------------------------------------------------------------------- */}
      {/*                          LOGO ARRIBA DEL MENSAJE                           */}
      {/* -------------------------------------------------------------------------- */}
      <div className="hero">
        <img className="base" src={logo} alt="iCarry" />
      </div>

      <h2>Página no encontrada</h2>
      <p>La página que buscás no existe.</p>

      {/* -------------------------------------------------------------------------- */}
      {/*                        BOTON PARA VOLVER AL INICIO                         */}
      {/* -------------------------------------------------------------------------- */}
      <Link className="counter" to="/">
        Volver al inicio
      </Link>
    </section>
  );
};
