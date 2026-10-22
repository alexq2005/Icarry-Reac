import { Link, useParams } from "react-router-dom";
import "./ProductSuccess.css";

export const ProductSuccess = () => {
  const { id } = useParams();

  return (
    <section className="product-success">
      <div className="product-success__icon" aria-hidden="true">
        ✅
      </div>
      <h2>Producto cargado con éxito</h2>
      <p>ID de producto: {id}</p>
      <p>Ya podés cargar otro producto.</p>
      <div className="product-success__actions">
        <Link className="btn bg-success" to="/admin">
          Cargar otro producto
        </Link>
      </div>
    </section>
  );
};
