/*------------------------------------------------------------*/
/*                     detalle del producto                     */
/*------------------------------------------------------------*/
/* Vista de un producto individual: imagen, descripcion y CTA
   "Agregar al carrito" debajo del precio (sin barra sticky). */

import { useCart } from "../../context/CartContext"
import "./ItemDetail.css"

const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value))

export const ItemDetail = ({ item }) => {
    const { addItem } = useCart()

    return (
        <article className="detail-layout">
            <div className="detail-media">
                <img
                    className="detail-media__img"
                    src={item.image}
                    alt={item.name}
                />
            </div>

            <div className="detail-info">
                <h2 className="detail-title">{item.name}</h2>
                <p className="detail-description">{item.description}</p>
                <p className="detail-price">{formatPrice(item.price)}</p>

                <div className="detail-cta-wrap">
                    <button
                        type="button"
                        className="btn bg-primary text-dark detail-cta"
                        onClick={() => addItem(item)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    )
}