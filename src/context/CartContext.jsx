/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

/*-----------------------------------------------------------*/
/*                   contexto del carrito                     */
/*-----------------------------------------------------------*/
export const CartContext = createContext(null)

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider")
    return ctx
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const isInCart = item => cart.some(i => i.id === item.id)

    const addItem = item => {
        if (isInCart(item)) return alert("Ya está en el carrito")
        setCart(prev => [...prev, item])
        alert("Producto agregado")
    }

    const removeItem = id => setCart(prev => prev.filter(i => i.id !== id))

    const clearCart = () => setCart([])

    const getTotalItems = () => cart.length

    const getCartTotal = () => cart.reduce((acc, i) => acc + Number(i.price), 0)

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotalItems, getCartTotal }}>
            {children}
        </CartContext.Provider>
    )
}
