/* -------------------------------------------------------------------------- */
/*                         TOTAL Y BOTON PARA COMPRAR                         */
/* -------------------------------------------------------------------------- */

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export const CartSummary = () => {
  const { getCartTotal, checkout, checkoutLoading, checkoutError } = useCart();

  /* -------------------------------------------------------------------------- */
  /*                           PASO EL TOTAL A PESOS                            */
  /* -------------------------------------------------------------------------- */
  const total = getCartTotal();
  const totalFormateado = formatPrice(total);

  return (
    /* -------------------------------------------------------------------------- */
    /*                    MUESTRO EL TOTAL Y EL BOTON COMPRAR                     */
    /* -------------------------------------------------------------------------- */
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
