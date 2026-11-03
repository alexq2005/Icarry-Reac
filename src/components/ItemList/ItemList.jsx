/* -------------------------------------------------------------------------- */
/*                      CADA TARJETA LLEVA A SU DETALLE                       */
/* -------------------------------------------------------------------------- */

import { Item } from "../Item/Item";
import { Link } from "react-router-dom";
import "./ItemList.css";

export const ItemList = ({ products }) => {
  /* -------------------------------------------------------------------------- */
  /*                         SI NO HAY PRODUCTOS AVISO                          */
  /* -------------------------------------------------------------------------- */
  if (!products.length) {
    return <p>No hay productos</p>;
  }

  /* -------------------------------------------------------------------------- */
  /*                          UNA TARJETA POR PRODUCTO                          */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="products-container">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <Item {...product}>
            <span className="btn bg-primary text-dark">Ver detalle</span>
          </Item>
        </Link>
      ))}
    </div>
  );
};
