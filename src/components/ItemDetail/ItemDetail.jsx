// el detalle reusa la misma tarjeta Item pero con el boton de agregar.
// por ahora el boton no hace nada porque no hay carrito implementado.
// cuando se implemente el carrito, aca iria el onClick con la logica.

import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
  // recibe el producto completo como prop "item"
  // y le paso todo al componente Item con spread (...item)
  return (
    <div className="detail-wrapper">
      <Item {...item}>
        {/* este boton todavia no tiene onClick.
            cuando se implemente el carrito, aca se conecta con agregarAlCarrito() */}
        <button className="btn bg-primary text-dark">Agregar al carrito</button>
      </Item>
    </div>
  );
};
