import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="cart-container">
      <h2>Página no encontrada</h2>
      <p>La página que buscás no existe.</p>
      <Link className="btn btn-primary" to="/">
        Volver al inicio
      </Link>
    </section>
  );
};
