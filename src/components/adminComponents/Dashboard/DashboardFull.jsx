import { useEffect, useState } from "react";
import { DashboardFullUI } from "./DashboardFullUI";
import { useAuth } from "../../../context/AuthContext";
import { getProducts, deleteProduct } from "../../../services/productsService";

export const DashboardFull = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // traer productos al montar
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  // eliminar con confirmación
  const handleDelete = (product) => {
    const confirmed = window.confirm(`¿Eliminar "${product.name}"?`);
    if (!confirmed) {
      return;
    }

    deleteProduct(product.id)
      .then(() => {
        // quitar de la lista
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <DashboardFullUI
      products={products}
      loading={loading}
      error={error}
      onDelete={handleDelete}
      onLogout={logout}
    />
  );
};
