/* Formateo los precios en pesos argentinos con dos decimales. */
export const formatPrice = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
};
