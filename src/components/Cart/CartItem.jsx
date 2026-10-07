/*------------------------------------------------------------*/
/*                     item del carrito                        */
/*------------------------------------------------------------*/
/* Tarjeta de un producto ya agregado: reusa Item y agrega
   el boton para quitarlo del carrito via removeItem. */

// Hook para acceder a las acciones compartidas del carrito.
import { useCart } from "../../context/CartContext";

// Tarjeta reutilizable que muestra los datos del producto.
import { Item } from "../Item/Item";

export const CartItem = ({ item }) => {
  // Obtiene la funcion que elimina un producto usando su identificador.
const { removeItem } = useCart();

return (
    // Pasa los datos del producto a la tarjeta y muestra el boton de eliminacion.
    <Item {...item}>
    <button
        className="btn bg-delete primary"
        onClick={() => removeItem(item.id)}
    >
        Eliminar
    </button>
    </Item>
);
};
