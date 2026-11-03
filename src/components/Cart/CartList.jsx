/* -------------------------------------------------------------------------- */
/*   RECORRO LOS PRODUCTOS DEL CARRITO Y MUESTRO UNA TARJETA PARA CADA UNO    */
/* -------------------------------------------------------------------------- */

import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart } = useCart();

  return (
    /* -------------------------------------------------------------------------- */
    /*         USO ESTE CONTENEDOR PARA ACOMODAR LAS TARJETAS DEL CARRITO         */
    /* -------------------------------------------------------------------------- */
    <div className="cart-items-container">
      {cart.map((element) => (
        <CartItem item={element} key={element.id} />
      ))}
    </div>
  );
};
