/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../services/productsService";

/* -------------------------------------------------------------------------- */
/*                              CREAMOS CONTEXTO                              */
/* -------------------------------------------------------------------------- */
/* Creo este contexto para compartir los datos del carrito con otros componentes. */
const CartContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                                 CUSTOM HOOK                                */
/* -------------------------------------------------------------------------- */
/* Uso este hook para acceder al carrito desde los demás componentes. */
export const useCart = () => {
  // Acá obtengo el carrito y las funciones que comparto con el contexto.
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

/* -------------------------------------------------------------------------- */
/*                                  PROVEEDOR                                 */
/* -------------------------------------------------------------------------- */
/* Acá guardo los productos y las funciones para manejar el carrito. */
export const CartProvider = ({ children }) => {
  // Después de confirmar la compra, vuelvo a la página principal.
  const navigate = useNavigate();
  // Guardo acá los productos que se agregan al carrito.
  const [cart, setCart] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Reviso si el producto ya está agregado para no repetirlo.
  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };

  // Agrego el producto si todavía no está en el carrito.
  const addItem = (item) => {
    if (isInCart(item)) {
      toast.warning("El producto ya existe en el carrito");
      return;
    }
    //forma funcional de "prev
    //setCart(prevCart => [...prev, item]);
    setCart([...cart, item]);
    toast.success("Producto agregado al carrito.");
  };

  // Busco por id y saco del carrito el producto indicado.
  const removeItem = (id) => {
    const updatedCart = cart.filter((element) => element.id !== id);
    setCart(updatedCart);
    toast.info("Producto eliminado del carrito.");
  };

  // Dejo el carrito vacío.
  const clearCart = () => {
    setCart([]);
  };
  // Devuelvo cuántos productos hay en el carrito.
  const getTotalItems = () => {
    return cart.length;
  };
  // Sumo los precios en centavos para evitar errores con los decimales.
  const getCartTotal = () => {
    const totalInCents = cart.reduce(
      (acc, element) => acc + Math.round(Number(element.price) * 100),
      0,
    );
    return totalInCents / 100;
  };
  // Muestro la confirmación, vacío el carrito y vuelvo al inicio.
  const checkout = async () => {
    if (cart.length === 0 || checkoutLoading) {
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      const orderId = await createOrder({
        items: cart,
        total: getCartTotal(),
      });
      clearCart();
      toast.success(`Tu compra se realizó correctamente. Número de orden: ${orderId}`);
      navigate("/");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      setCheckoutError("No se pudo registrar la compra. Intentá nuevamente.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Junto los datos y funciones que quiero compartir.
  const values = {
    cart,
    addItem,
    removeItem,
    clearCart,
    getTotalItems,
    getCartTotal,
    checkout,
    checkoutLoading,
    checkoutError,
  };
  // Comparto esta información con los componentes que están dentro del proveedor.
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
