import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../../services/productsService";
import "../Products/Products.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(price));

const formatOrderDate = (createdAt) => {
  if (!createdAt?.toDate) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(createdAt.toDate());
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadOrders = async () => {
      try {
        const orderList = await getOrders();
        if (active) {
          setOrders(orderList);
        }
      } catch (loadError) {
        console.error("Error al cargar las órdenes:", loadError);
        if (active) {
          setError("No se pudieron cargar las órdenes. Intentá nuevamente.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, []);

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
                  <p>{formatOrderDate(order.createdAt)}</p>
                </div>
                <span className="order-status">{order.status || "recibida"}</span>
              </header>

              <ul className="order-items">
                {(order.items || []).map((item, index) => (
                  <li
                    className="order-item"
                    key={`${item.productId || item.name}-${index}`}
                  >
                    <span>{item.name || "Producto"}</span>
                    <span>{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>

              <p className="order-card-total">
                Total: {formatPrice(order.total)}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
