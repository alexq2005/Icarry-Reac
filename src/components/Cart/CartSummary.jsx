/* -------------------------------------------------------------------------- */
/*       EN ESTE COMPONENTE MUESTRO EL TOTAL Y DEJO CONFIRMAR LA COMPRA       */
/* -------------------------------------------------------------------------- */

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export const CartSummary = () => {
  const { getCartTotal, checkout, checkoutLoading, checkoutError } = useCart();

  /* -------------------------------------------------------------------------- */
  /*       FORMATEO EL TOTAL PARA MOSTRARLO EN PESOS Y CON DOS DECIMALES        */
  /* -------------------------------------------------------------------------- */
  const total = getCartTotal();
  const totalFormateado = formatPrice(total);

  return (
    /* -------------------------------------------------------------------------- */
    /*            MUESTRO EL TOTAL Y EL BOTÓN PARA TERMINAR LA COMPRA             */
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
