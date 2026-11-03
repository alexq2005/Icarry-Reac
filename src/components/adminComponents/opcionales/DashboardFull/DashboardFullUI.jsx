import { Link } from "react-router-dom";
import { ProductAdminListContainer } from "../ProductAdminList/ProductAdminListContainer";
import "../../Dashboard/Dashboard.css";
import { FaPlus, FaClipboardList, FaArrowLeft } from "react-icons/fa";

export const DashboardFullUI = ({ onLogout }) => {
  return (
    <div className="dashboard dashboard-full">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>

        <div className="header-actions">
          <Link className="btn btn-secondary" to="/">
            <FaArrowLeft /> Volver a la tienda
          </Link>
          <button className="btn dashboard-btn-logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-help">
        <h3>Ayuda</h3>
        <p>
          Desde este panel podés gestionar los productos de la tienda y
          consultar las compras.
        </p>
      </section>

      <section className="dashboard-manage">
        <h3>Gestión de productos</h3>

        <div className="dashboard-actions">
          {/* Accion principal: cargar un producto nuevo */}
          <Link to="/admin/products/new" className="dashboard-action dashboard-action-main">
            <span className="dashboard-action-icon" aria-hidden="true"><FaPlus /></span>
            <span className="dashboard-action-title">Cargar producto</span>
            <span className="dashboard-action-text">Sumá un producto nuevo a la tienda.</span>
          </Link>

          {/* Accion secundaria: ver las compras */}
          <Link to="/admin/orders" className="dashboard-action">
            <span className="dashboard-action-icon" aria-hidden="true"><FaClipboardList /></span>
            <span className="dashboard-action-title">Órdenes de compra</span>
            <span className="dashboard-action-text">Revisá las compras de tus clientes.</span>
          </Link>
        </div>
      </section>

      <ProductAdminListContainer />
    </div>
  );
};
