import { Link } from "react-router-dom";
import "./Dashboard.css";

export const DashboardFullUI = ({ products, loading, error, onDelete, onLogout }) => {
  return (
    <div className="dashboard dashboard-full">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>

        <div className="header-actions">
          <Link className="btn btn-secondary" to="/">
            Volver a la tienda
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
            <span className="dashboard-action-icon" aria-hidden="true">➕</span>
            <span className="dashboard-action-title">Cargar producto</span>
            <span className="dashboard-action-text">Sumá un producto nuevo a la tienda.</span>
          </Link>

          {/* Accion secundaria: ver las compras */}
          <Link to="/admin/orders" className="dashboard-action">
            <span className="dashboard-action-icon" aria-hidden="true">🧾</span>
            <span className="dashboard-action-title">Órdenes de compra</span>
            <span className="dashboard-action-text">Revisá las compras de tus clientes.</span>
          </Link>
        </div>
      </section>

      <section className="dashboard-products">
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
                <span className="dashboard-item-price">${prod.price}</span>
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
    </div>
  );
};
