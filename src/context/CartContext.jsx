/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
/*-----------------------------------------------------------*/
/*                   contexto del carrito                     */
/*-----------------------------------------------------------*/
const CartContext = createContext(null)

/*-----------------------------------------------------------*/
/*                   hook del carrito                          */
/*-----------------------------------------------------------*/
export const useCart = () => {
// Lee el contexto para que los componentes accedan al estado y sus acciones.
const context =useContext(CartContext);

    
    if (!context){
        throw new Error("useCart debe usarse dentro de CartProvider")
    }               
    return context
};
/*-----------------------------------------------------------*/
/*                   proveedor del carrito                     */
/*-----------------------------------------------------------*/
export const CartProvider = ({ children }) => {
    // useNavigate permite volver al inicio después de confirmar la compra.
    const navigate = useNavigate()
    // Estado compartido con los componentes que usan useCart.
    const [cart, setCart] = useState([])

    // Comprueba si ya existe un producto con el mismo identificador.
    const isInCart = (item) =>{
        const inInCart = cart.some((element) => element.id === item.id);
            return inInCart;
        
            
    };

    // Agrega el producto solo si todavía no está en el carrito.
    const addItem = item => {
        if (isInCart(item)) {
            alert("El producto ya existe en el carrito")
            return;
        }

        //forma del carrito
        //setCart(prev => [...prev, item])
        setCart([...cart, item]);
        alert("Producto agregado al carrito 🎉")
    };
    // Elimina del carrito el producto cuyo id se recibe como argumento.
    const removeItem = id => {
        const updateCart = cart.filter(element => element.id !== id);
        setCart(updateCart);
        alert("Producto eliminado ✅");
    
    //Forma funcional"prev
    //setCart(prev => prev.filter(element => element.id !== id))
    };

// Vacía todos los productos del carrito.
    const clearCart = () => {
        setCart([]);
    };
// Devuelve la cantidad de productos guardados (sin cantidades individuales).
    const getTotalItems = () =>{
        return cart.length;
    }
// Suma los precios de todos los productos del carrito.
    const getCartTotal = () =>{
        const totalInCents = cart.reduce(
            (acc, element) => acc + Math.round(Number(element.price) * 100),
            0
        );
        return totalInCents / 100;
    };
// Confirma la compra, vacía el carrito y navega de regreso al inicio.
    const checkout = () => {
        alert("Su compra ha sido realizada 🎉")
        clearCart()
        navigate("/")
    };

    // Agrupa el estado y las acciones que estarán disponibles desde useCart.
    const values=  {
        cart,
        addItem,
        removeItem,
        clearCart,
        getTotalItems,
        getCartTotal,
        checkout,
    };
    // Provee los datos del carrito a los componentes descendientes.
    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
    
};
