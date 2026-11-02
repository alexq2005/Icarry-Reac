/* En este componente muestro el total y dejo confirmar la compra. */

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export const CartSummary = () => {
  const { getCartTotal, checkout, checkoutLoading, checkoutError } = useCart();

  /* Formateo el total para mostrarlo en pesos y con dos decimales. */
  const total = getCartTotal();
  const totalFormateado = formatPrice(total);

  return (
    /* Muestro el total y el botón para terminar la compra. */
    <div className="cart-actions">
      <p>TOTAL A PAGAR: {totalFormateado}</p>
      <button
        className="btn bg-success primary"
        onClick={checkout}
        disabled={checkoutLoading}
      >
        {checkoutLoading ? "Registrando compra..." : "Finalizar compra"}
      </button>
      {checkoutError && (
        <p className="error" role="alert">
          {checkoutError}
        </p>
      )}
    </div>
  );
};
