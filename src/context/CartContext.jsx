/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
/*-----------------------------------------------------------*/
/*                   contexto del carrito                     */
/*-----------------------------------------------------------*/
export const CartContext = createContext(null);

/*-----------------------------------------------------------*/
/*                  hook para usar el carrito                 */
/*-----------------------------------------------------------*/
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }

  return context;
};

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
      alert("Producto ya existe en el carrito");
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
  /*                  cantidad de productos                    */
  /*-----------------------------------------------------------*/
  const getTotalItems = () => cart.length;

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
    getTotalItems,
    getCartTotal,
    checkout,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
