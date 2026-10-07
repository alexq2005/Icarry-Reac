/* En este componente muestro el total y dejo confirmar la compra. */

import { useCart } from "../../context/CartContext"

export const CartSummary = () => {
    const { getCartTotal, checkout } = useCart()

    /* Formateo el total para mostrarlo en pesos y con dos decimales. */
    const total = getCartTotal()
    const totalFormateado = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(total)

    return (
        /* Muestro el total y el botón para terminar la compra. */
        <div className="cart-actions">
            <p>TOTAL A PAGAR: {totalFormateado}</p>
            <button className="btn bg-success primary" onClick={checkout}>
                Finalizar compra
            </button>
        </div>
    )
}