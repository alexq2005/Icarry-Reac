import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import { formatPrice } from "../../../../utils/formatPrice";
import "../../Dashboard/Dashboard.css";

export const ProductAdminListUI = ({ products, loading, error, onDelete }) => {
  //si estoy fuera del panel, muestro el boton para volver
  const { pathname } = useLocation();
  const outsidePanel = pathname === "/admin/products";

  return (
    <section className="dashboard-products">
      {outsidePanel && (
        <>
          <Helmet>
            <title>Productos | iCarry</title>
          </Helmet>
          <Link className="btn btn-secondary" to={"/admin/dashboard"}>
            <FaArrowLeft /> Volver al panel
          </Link>
        </>
      )}

      <div className="dashboard-products-header">
        <h3>Productos cargados</h3>
        <span className="dashboard-badge">{products.length} productos</span>
      </div>

      {loading && <p className="dashboard-msg">Cargando productos...</p>}
      {error && <p className="dashboard-msg dashboard-error">{error}</p>}

      <ul className="dashboard-list">
        {products.map((prod) => (
          <li key={prod.id} className="dashboard-item">
            {prod.image && (
              <img className="dashboard-item-img" src={prod.image} alt={prod.name} />
            )}

            <div className="dashboard-item-info">
              <strong>{prod.name}</strong>
              <span className="dashboard-item-category">{prod.category}</span>
              <span className="dashboard-item-price">{formatPrice(prod.price)}</span>
            </div>

            <div className="dashboard-item-actions">
              <Link
                to={`/admin/products/edit/${prod.id}`}
                className="btn dashboard-btn-edit"
              >
                Editar
              </Link>
              <button
                className="btn dashboard-btn-delete"
                onClick={() => onDelete(prod)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
