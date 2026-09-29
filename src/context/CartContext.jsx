import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/*-----------------------------------------------------------*/
/*                   contexto del carrito                     */
/*-----------------------------------------------------------*/
export const CartContext = createContext();

/*-----------------------------------------------------------*/
/*                    provider del carrito                    */
/*-----------------------------------------------------------*/
export const CartProvider = ({ children }) => {
  const navigate = useNavigate();

  /*------------------------------------------------------------*/
  /*                     estado del carrito                     */
  /*------------------------------------------------------------*/
  const [cart, setCart] = useState([]);

  /*-----------------------------------------------------------*/
  /*                     revisar si existe                     */
  /*-----------------------------------------------------------*/
  const isInCart = (item) => cart.some((element) => element.id === item.id);

  /*-----------------------------------------------------------*/
  /*                       agregar producto                     */
  /*-----------------------------------------------------------*/
  const addItem = (item) => {
    if (isInCart(item)) {
      alert("El producto ya está en el carrito");
      return;
    }

    setCart((prev) => [...prev, item]);
    alert("Producto agregado al carrito");
  };

  /*-----------------------------------------------------------*/
  /*                       eliminar producto                    */
  /*-----------------------------------------------------------*/
  const removeItem = (id) => {
    setCart((prev) => prev.filter((element) => element.id !== id));
    alert("Producto eliminado del carrito");
  };

  /*-----------------------------------------------------------*/
  /*                       vaciar carrito                       */
  /*-----------------------------------------------------------*/
  const clearCart = () => {
    setCart([]);
    alert("Carrito vaciado");
  };

  /*-----------------------------------------------------------*/
  /*                       total del carrito                    */
  /*-----------------------------------------------------------*/
  const getCartTotal = () =>
    cart.reduce((acc, element) => acc + (Number(element.price) || 0), 0);

  /*-----------------------------------------------------------*/
  /*                       finalizar compra                     */
  /*-----------------------------------------------------------*/
  const checkout = () => {
    alert("Su compra fue realizada con éxito");
    clearCart();
    navigate("/");
  };

  /*-----------------------------------------------------------*/
  /*                 valores que entrega el contexto            */
  /*-----------------------------------------------------------*/
  const values = {
    cart,
    addItem,
    clearCart,
    removeItem,
    getCartTotal,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
