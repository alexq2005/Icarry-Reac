// Hook para acceder a las acciones compartidas del carrito.
import { useCart } from "../../context/CartContext";

// Tarjeta reutilizable que muestra los datos del producto.
import { Item } from "../Item/Item";

// Recibe un producto y agrega a su tarjeta la opción de quitarlo del carrito.
export const CartItem = ({ item }) => {
  // Obtiene la función que elimina un producto usando su identificador.
const { removeItem } = useCart();

return (
    // Pasa los datos del producto a la tarjeta y muestra el botón de eliminación.
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