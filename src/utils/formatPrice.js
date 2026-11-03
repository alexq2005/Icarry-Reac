/* -------------------------------------------------------------------------- */
/*         FORMATEO LOS PRECIOS EN PESOS ARGENTINOS CON DOS DECIMALES         */
/* -------------------------------------------------------------------------- */
export const formatPrice = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
};
