import { Link } from "react-router-dom";
import { formatPrice } from "../../../utils/formatPrice";

//formatear fecha de la orden
const formatDate = (createdAt) => {
  if (!createdAt?.toDate) {
    return "Fecha no disponible";
  }
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(createdAt.toDate());
};

export const OrderListUI = ({ orders, loading, error, onCancel }) => {
  return (
    <section className="admin-orders">
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">VENTAS</p>
          <h1>Órdenes de compra</h1>
          <p>Consultá las compras registradas en la tienda.</p>
        </div>
        <div className="admin-page-actions">
          <Link className="btn btn-admin-secondary" to="/admin/dashboard">
            Panel
          </Link>
          <Link className="btn btn-admin-secondary" to="/admin/products">
            Productos
          </Link>
        </div>
      </header>

      {error && (
        <p className="admin-message admin-message-error" role="alert">
          {error}
        </p>
      )}

      {/* cargando / vacío / lista */}
      {loading ? (
        <p className="admin-message" role="status">
          Cargando órdenes...
        </p>
      ) : orders.length === 0 ? (
        <div className="admin-empty-state">
          <h2>Todavía no hay órdenes</h2>
          <p>Las compras confirmadas aparecerán en esta lista.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <header className="order-card-header">
                <div>
                  <h2>Orden {order.id}</h2>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <span
                  className={`order-status ${
                    order.status === "cancelada" ? "order-status-cancelada" : ""
                  }`}
                >
                  {order.status || "recibida"}
                </span>
              </header>

              <ul className="order-items">
                {(order.items || []).map((item, index) => (
                  <li className="order-item" key={`${item.productId}-${index}`}>
                    <span>{item.name}</span>
                    <span>{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>

              <p className="order-card-total">
                Total: {formatPrice(order.total)}
              </p>

              {order.status !== "cancelada" && (
                <button
                  className="btn dashboard-btn-delete"
                  onClick={() => onCancel(order.id)}
                >
                  Cancelar Orden
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
