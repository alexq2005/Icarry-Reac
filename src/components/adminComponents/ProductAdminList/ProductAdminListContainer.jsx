import { useEffect, useState } from "react";
import { ProductAdminListUI } from "./ProductAdminListUI";
import {
  getProducts,
  deleteProduct,
} from "../../../services/productsService";
import "../Products/Products.css";

export const ProductAdminListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //traer los productos
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (product) => {
    //confirmar antes de eliminar
    const confirmed = window.confirm(
      `¿Querés eliminar el producto "${product.name}"?`,
    );
    if (!confirmed) {
      return;
    }

    try {
      //eliminar
      await deleteProduct(product.id);
      //sacarlo de la lista
      setProducts(products.filter((p) => p.id !== product.id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ProductAdminListUI
      products={products}
      loading={loading}
      error={error}
      onDelete={handleDelete}
    />
  );
};
