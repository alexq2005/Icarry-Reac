/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

/* Creo este contexto para compartir los datos del carrito con otros componentes. */
const CartContext = createContext(null)

/* Uso este hook para acceder al carrito desde los demás componentes. */
export const useCart = () => {
    // Acá obtengo el carrito y las funciones que comparto con el contexto.
const context =useContext(CartContext);

    
    if (!context){
        throw new Error("useCart debe usarse dentro de CartProvider")
    }               
    return context
};

/* Acá guardo los productos y las funciones para manejar el carrito. */
export const CartProvider = ({ children }) => {
    // Después de confirmar la compra, vuelvo a la página principal.
    const navigate = useNavigate()
    // Guardo acá los productos que se agregan al carrito.
    const [cart, setCart] = useState([])

    // Reviso si el producto ya está agregado para no repetirlo.
    const isInCart = (item) =>{
        const inInCart = cart.some((element) => element.id === item.id);
            return inInCart;
        
            
    };

    // Agrego el producto si todavía no está en el carrito.
    const addItem = item => {
        if (isInCart(item)) {
            alert("El producto ya existe en el carrito")
            return;
        }

        setCart([...cart, item]);
        alert("Producto agregado al carrito.")
    };
    // Busco por id y saco del carrito el producto indicado.
    const removeItem = id => {
        const updateCart = cart.filter(element => element.id !== id);
        setCart(updateCart);
        alert("Producto eliminado del carrito.")
    
    };

// Dejo el carrito vacío.
    const clearCart = () => {
        setCart([]);
    };
// Devuelvo cuántos productos hay en el carrito.
    const getTotalItems = () =>{
        return cart.length;
    }
// Sumo los precios en centavos para evitar errores con los decimales.
    const getCartTotal = () =>{
        const totalInCents = cart.reduce(
            (acc, element) => acc + Math.round(Number(element.price) * 100),
            0
        );
        return totalInCents / 100;
    };
// Muestro la confirmación, vacío el carrito y vuelvo al inicio.
    const checkout = () => {
        alert("Tu compra se realizó correctamente.")
        clearCart()
        navigate("/")
    };

    // Junto los datos y funciones que quiero compartir.
    const values=  {
        cart,
        addItem,
        removeItem,
        clearCart,
        getTotalItems,
        getCartTotal,
        checkout,
    };
    // Comparto esta información con los componentes que están dentro del proveedor.
    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
    
};
