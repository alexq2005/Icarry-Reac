/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../services/productsService";

/* -------------------------------------------------------------------------- */
/*                            CONTEXTO DEL CARRITO                            */
/* -------------------------------------------------------------------------- */
const CartContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                         HOOK PARA USAR EL CARRITO                          */
/* -------------------------------------------------------------------------- */
export const useCart = () => {
  /* -------------------------------------------------------------------------- */
  /*                        TOMO EL CONTEXTO DEL CARRITO                        */
  /* -------------------------------------------------------------------------- */
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

/* -------------------------------------------------------------------------- */
/*                            PROVIDER DEL CARRITO                            */
/* -------------------------------------------------------------------------- */
export const CartProvider = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                  PARA VOLVER AL INICIO DESPUES DE COMPRAR                  */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();
  /* -------------------------------------------------------------------------- */
  /*                  PRODUCTOS DEL CARRITO Y ESTADO DE COMPRA                  */
  /* -------------------------------------------------------------------------- */
  const [cart, setCart] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                      ME FIJO SI YA ESTA EN EL CARRITO                      */
  /* -------------------------------------------------------------------------- */
  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };

  /* -------------------------------------------------------------------------- */
  /*                         AGREGO SI TODAVIA NO ESTA                          */
  /* -------------------------------------------------------------------------- */
  const addItem = (item) => {
    if (isInCart(item)) {
      toast.warning("El producto ya existe en el carrito");
      return;
    }
    /* -------------------------------------------------------------------------- */
    /*                          FORMA FUNCIONAL DE "PREV                          */
    /* -------------------------------------------------------------------------- */
    //setCart(prevCart => [...prev, item]);
    setCart([...cart, item]);
    toast.success("Producto agregado al carrito.");
  };

  /* -------------------------------------------------------------------------- */
  /*                          SACO EL PRODUCTO POR ID                           */
  /* -------------------------------------------------------------------------- */
  const removeItem = (id) => {
    const updatedCart = cart.filter((element) => element.id !== id);
    setCart(updatedCart);
    toast.info("Producto eliminado del carrito.");
  };

  /* -------------------------------------------------------------------------- */
  /*                              VACIO EL CARRITO                              */
  /* -------------------------------------------------------------------------- */
  const clearCart = () => {
    setCart([]);
  };
  /* -------------------------------------------------------------------------- */
  /*                           CUANTOS PRODUCTOS HAY                            */
  /* -------------------------------------------------------------------------- */
  const getTotalItems = () => {
    return cart.length;
  };
  /* -------------------------------------------------------------------------- */
  /*                 SUMO EN CENTAVOS PARA NO PERDER DECIMALES                  */
  /* -------------------------------------------------------------------------- */
  const getCartTotal = () => {
    const totalInCents = cart.reduce(
      (acc, element) => acc + Math.round(Number(element.price) * 100),
      0,
    );
    return totalInCents / 100;
  };
  /* -------------------------------------------------------------------------- */
  /*                   CONFIRMO LA COMPRA Y VACIO EL CARRITO                    */
  /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                      LO QUE COMPARTO CON EL CONTEXTO                       */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                       LE PASO TODO A LOS COMPONENTES                       */
  /* -------------------------------------------------------------------------- */
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
