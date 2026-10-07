import{useCart}from "../../context/CartContext";

// Muestra el total acumulado y permite confirmar la compra.
export const CartSummary = () => {
    // Obtiene las funciones necesarias del contexto del carrito.
    const{getCartTotal,checkout}=useCart();

    // Calcula el importe a pagar con los productos actuales.
    const total = getCartTotal();
    const totalFormateado=new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
        }).format(total);
    return(
        <>
        <p>TOTAL A PAGAR: {totalFormateado}</p>
        {/* checkout vacía el carrito y regresa a la página principal. */}
        <button className="btn btn-primary" onClick={checkout}>
            Finalizar compra
        </button>
        </>
    );
};