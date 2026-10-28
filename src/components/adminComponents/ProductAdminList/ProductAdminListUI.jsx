import { Link } from "react-router-dom";

export const ProductAdminListUI = ({ products, loading, error, onDelete }) => {
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
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div className="admin-product-cell">
                      {prod.image && <img src={prod.image} alt={prod.name} />}
                      <span>{prod.name}</span>
                    </div>
                  </td>
                  <td>{prod.category}</td>
                  <td>${prod.price}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link
                        className="btn btn-admin-secondary"
                        to={`/admin/products/edit/${prod.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn bg-delete"
                        type="button"
                        onClick={() => onDelete(prod)}
                      >
                        Eliminar
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
