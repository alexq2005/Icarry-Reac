/*------------------------------------------------------------*/
/*                     resumen de compra                       */
/*------------------------------------------------------------*/
/* Muestra el total acumulado (ARS) y permite confirmar la compra. */

import{useCart}from "../../context/CartContext";

export const CartSummary = () => {
    // Obtiene las funciones necesarias del contexto del carrito.
    const{getCartTotal,checkout}=useCart();

    /*----- total formateado -----*/
    // Calcula el importe a pagar con los productos actuales.
    const total = getCartTotal();
    const totalFormateado=new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(total);

    /*----- UI -----*/
    return(
        <div className="cart-actions">
        <p>TOTAL A PAGAR: {totalFormateado}</p>
        {/* checkout vacia el carrito y regresa a la pagina principal */}
        <button className="btn bg-success primary" onClick={checkout}>
            Finalizar compra
        </button>
        </div>
    );
};
