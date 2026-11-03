/* -------------------------------------------------------------------------- */
/*                   TARJETA DEL CARRITO CON BOTON ELIMINAR                   */
/* -------------------------------------------------------------------------- */

import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";

export const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <Item {...item}>
      {/* -------------------------------------------------------------------------- */}
      {/*                        SACO EL PRODUCTO DEL CARRITO                        */}
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
