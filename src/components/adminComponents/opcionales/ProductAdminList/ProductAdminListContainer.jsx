import { useEffect, useState } from "react";
import { ProductAdminListUI } from "./ProductAdminListUI";
import {
  getProducts,
  deleteProduct,
} from "../../../../services/productsService";
import "../../Products/Products.css";

export const ProductAdminListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                            TRAER LOS PRODUCTOS                             */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("No se pudieron cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (product) => {
    /* -------------------------------------------------------------------------- */
    /*                        CONFIRMAR ANTES DE ELIMINAR                         */
    /* -------------------------------------------------------------------------- */
    const confirmed = window.confirm(
      `¿Querés eliminar el producto "${product.name}"?`,
    );
    if (!confirmed) {
      return;
    }

    try {
      /* -------------------------------------------------------------------------- */
      /*                                  ELIMINAR                                  */
      /* -------------------------------------------------------------------------- */
      await deleteProduct(product.id);
      /* -------------------------------------------------------------------------- */
      /*                            SACARLO DE LA LISTA                             */
      /* -------------------------------------------------------------------------- */
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
