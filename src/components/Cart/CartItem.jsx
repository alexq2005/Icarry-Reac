/* -------------------------------------------------------------------------- */
/*     MUESTRO UN PRODUCTO DEL CARRITO Y AGREGO EL BOTÓN PARA ELIMINARLO      */
/* -------------------------------------------------------------------------- */

import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";

export const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <Item {...item}>
      {/* -------------------------------------------------------------------------- */}
      {/*                CON ESTE BOTÓN SACO EL PRODUCTO DEL CARRITO                 */}
      {/* -------------------------------------------------------------------------- */}
      <button
        className="btn bg-delete primary"
        onClick={() => removeItem(item.id)}
      >
        Eliminar
      </button>
    </Item>
  );
};
