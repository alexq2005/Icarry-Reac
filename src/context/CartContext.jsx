/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../services/productsService";

/* -------------------------------------------------------------------------- */
/*                              CREAMOS CONTEXTO                              */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*              CREO ESTE CONTEXTO PARA COMPARTIR LOS DATOS DEL               */
/*                       CARRITO CON OTROS COMPONENTES                        */
/* -------------------------------------------------------------------------- */
const CartContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOK                                 */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*     USO ESTE HOOK PARA ACCEDER AL CARRITO DESDE LOS DEMÁS COMPONENTES      */
/* -------------------------------------------------------------------------- */
export const useCart = () => {
  /* -------------------------------------------------------------------------- */
  /*    ACÁ OBTENGO EL CARRITO Y LAS FUNCIONES QUE COMPARTO CON EL CONTEXTO     */
  /* -------------------------------------------------------------------------- */
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

/* -------------------------------------------------------------------------- */
/*                                 PROVEEDOR                                  */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*      ACÁ GUARDO LOS PRODUCTOS Y LAS FUNCIONES PARA MANEJAR EL CARRITO      */
/* -------------------------------------------------------------------------- */
export const CartProvider = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*        DESPUÉS DE CONFIRMAR LA COMPRA, VUELVO A LA PÁGINA PRINCIPAL        */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();
  /* -------------------------------------------------------------------------- */
  /*             GUARDO ACÁ LOS PRODUCTOS QUE SE AGREGAN AL CARRITO             */
  /* -------------------------------------------------------------------------- */
  const [cart, setCart] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  /* -------------------------------------------------------------------------- */
  /*          REVISO SI EL PRODUCTO YA ESTÁ AGREGADO PARA NO REPETIRLO          */
  /* -------------------------------------------------------------------------- */
  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };

  /* -------------------------------------------------------------------------- */
  /*            AGREGO EL PRODUCTO SI TODAVÍA NO ESTÁ EN EL CARRITO             */
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
  /*            BUSCO POR ID Y SACO DEL CARRITO EL PRODUCTO INDICADO            */
  /* -------------------------------------------------------------------------- */
  const removeItem = (id) => {
    const updatedCart = cart.filter((element) => element.id !== id);
    setCart(updatedCart);
    toast.info("Producto eliminado del carrito.");
  };

  /* -------------------------------------------------------------------------- */
  /*                           DEJO EL CARRITO VACÍO                            */
  /* -------------------------------------------------------------------------- */
  const clearCart = () => {
    setCart([]);
  };
  /* -------------------------------------------------------------------------- */
  /*                DEVUELVO CUÁNTOS PRODUCTOS HAY EN EL CARRITO                */
  /* -------------------------------------------------------------------------- */
  const getTotalItems = () => {
    return cart.length;
  };
  /* -------------------------------------------------------------------------- */
  /*     SUMO LOS PRECIOS EN CENTAVOS PARA EVITAR ERRORES CON LOS DECIMALES     */
  /* -------------------------------------------------------------------------- */
  const getCartTotal = () => {
    const totalInCents = cart.reduce(
      (acc, element) => acc + Math.round(Number(element.price) * 100),
      0,
    );
    return totalInCents / 100;
  };
  /* -------------------------------------------------------------------------- */
  /*        MUESTRO LA CONFIRMACIÓN, VACÍO EL CARRITO Y VUELVO AL INICIO        */
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
  /*              JUNTO LOS DATOS Y FUNCIONES QUE QUIERO COMPARTIR              */
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
  /*               COMPARTO ESTA INFORMACIÓN CON LOS COMPONENTES                */
  /*                       QUE ESTÁN DENTRO DEL PROVEEDOR                       */
  /* -------------------------------------------------------------------------- */
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
