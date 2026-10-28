import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
} from "../../../services/productsService";
import "./Products.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(price));

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const productList = await getProducts();
        if (active) {
          setProducts(productList);
        }
      } catch (loadError) {
        console.error("Error al cargar los productos:", loadError);
        if (active) {
          setError("No se pudieron cargar los productos. Intentá nuevamente.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Querés eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(product.id);
    setError("");

    try {
      await deleteProduct(product.id);
      setProducts((currentProducts) =>
        currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
      );
    } catch (deleteError) {
      console.error("Error al eliminar el producto:", deleteError);
      setError("No se pudo eliminar el producto. Intentá nuevamente.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="admin-products">
      <header className="admin-page-header">
        <div>
          <p className="admin-eyebrow">CATÁLOGO</p>
          <h1>Productos</h1>
          <p>Gestioná los artículos publicados en la tienda.</p>
        </div>
        <div className="admin-page-actions">
          <Link className="btn btn-admin-secondary" to="/admin/dashboard">
            Panel
          </Link>
          <Link className="btn bg-primary" to="/admin/products/new">
            Agregar producto
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
          Cargando productos...
        </p>
      ) : products.length === 0 ? (
        <div className="admin-empty-state">
          <h2>El catálogo está vacío</h2>
          <p>Agregá un producto para que aparezca en la tienda.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      {product.image && (
                        <img src={product.image} alt="" loading="lazy" />
                      )}
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category || "Sin categoría"}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link
                        className="btn btn-admin-secondary"
                        to={`/admin/products/edit/${product.id}`}
                        aria-label={`Editar ${product.name}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn bg-delete"
                        type="button"
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product.id}
                        aria-label={`Eliminar ${product.name}`}
                      >
                        {deletingId === product.id ? "Eliminando..." : "Eliminar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
