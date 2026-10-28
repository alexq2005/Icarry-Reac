import { useEffect, useState } from "react";
import { OrderListUI } from "./OrderListUI";
import { cancelOrder, getOrders } from "../../../services/productsService";
import "../Products/Products.css";

export const OrderListContainer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //traer las órdenes
  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data))
      .catch(() => setError("No se pudieron cargar las órdenes"))
      .finally(() => setLoading(false));
  }, []);
  
  //Cancelar Orden
  const handleCancel =(id)=>{
    if (!confirm("¿Cancelar esta orden?")) return;
    cancelOrder(id)
    .then(()=> setOrders(orders.map((o) =>(o.id===id?{...o,status:"cancelada"}:o)))
  )
  .catch(()=> setError("No se pudo cancelar la orden"));

  };

  return <OrderListUI orders={orders} loading={loading} error={error} onCancel={handleCancel} />;
};
