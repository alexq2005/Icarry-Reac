// recibe los productos y arma la grilla de tarjetas.
// cada tarjeta esta envuelta en un Link para que al hacer click
// te lleve al detalle del producto (/product/:id)

import { Item } from "../Item/Item";
import { Link } from "react-router-dom";
import "./ItemList.css";

export const ItemList = ({ products }) => {
  // si el array esta vacio, muestro un mensaje
  if (!products.length) {
    return <p>No hay productos</p>;
  }

  // mapeo cada producto a una tarjeta Item.
  // el key es obligatorio en React cuando haces .map() para que sepa cual es cual.
  // toda la tarjeta es un link al detalle, y le paso un boton "Ver detalle" como children
  return (
    <div className="contenedor-tarjetas">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          {/* el spread (...product) es como pasar name={product.name} price={product.price} etc */}
          <Item {...product}>
            <span className="btn bg-primary text-dark">Ver detalle</span>
          </Item>
        </Link>
      ))}
    </div>
  );
};
