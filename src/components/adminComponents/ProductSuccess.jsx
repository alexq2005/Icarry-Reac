import { Link, useParams } from "react-router-dom";
import "./ProductSuccess.css";

/* -------------------------------------------------------------------------- */
/*                         AVISO DE PRODUCTO CARGADO                          */
/* -------------------------------------------------------------------------- */
export const ProductSuccess = () => {
  const { id } = useParams();

  return (
    <section className="product-success">
      <div className="success-icon" aria-hidden="true">
        ✅
      </div>
      <h2>Producto cargado con éxito</h2>
      <p>ID de producto: {id}</p>
      <p>Ya podés cargar otro producto.</p>
      <div className="success-actions">
        <Link className="btn bg-success" to="/admin/products/new">
          Cargar otro producto
        </Link>
        <Link className="btn bg-primary" to="/admin/products">
          Ver productos
        </Link>
      </div>
    </section>
  );
};
