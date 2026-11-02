import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

export const NotFound = () => {
  return (
    <section id="center">
      {/* Uso las reglas .hero y .base del repo de referencia para el logo. */}
      <div className="hero">
        <img className="base" src={logo} alt="iCarry" />
      </div>

      <h2>Página no encontrada</h2>
      <p>La página que buscás no existe.</p>

      {/* Uso la regla .counter para el botón de volver. */}
      <Link className="counter" to="/">
        Volver al inicio
      </Link>
    </section>
  );
};
