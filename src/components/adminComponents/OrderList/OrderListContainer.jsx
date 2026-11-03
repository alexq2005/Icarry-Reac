import { useEffect, useState } from "react";
import { OrderListUI } from "./OrderListUI";
import { cancelOrder, getOrders } from "../../../services/productsService";
import "../Products/Products.css";

export const OrderListContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                       CARGO LAS ORDENES DE FIREBASE                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch(() => setError("No se pudieron cargar las órdenes"))
      .finally(() => setLoading(false));
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                        CANCELO LA ORDEN SI CONFIRMA                        */
  /* -------------------------------------------------------------------------- */
  const handleCancel = async (id) => {
    const confirmed = window.confirm("¿Cancelar esta orden?");
    if (!confirmed) {
      return;
    }

    try {
      await cancelOrder(id);
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: "cancelada" } : order,
        ),
      );
    } catch (error) {
      console.error("Error al cancelar la orden:", error);
      setError("No se pudo cancelar la orden");
    }
  };

  return (
    <OrderListUI
      orders={orders}
      loading={loading}
      error={error}
      onCancel={handleCancel}
    />
  );
};
