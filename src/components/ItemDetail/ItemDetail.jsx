/* En esta parte muestro los datos del producto y el botón para agregarlo al carrito. */

import { useCart } from "../../context/CartContext"
import "./ItemDetail.css"

/* Uso estos nombres para mostrar las categorías de forma más clara. */
const CATEGORY_LABELS = {
    "items-del-juego": "Items del juego",
    merchandising: "Merchandising",
}

/* Formateo el precio para mostrarlo en pesos y con dos decimales. */
const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value))

export const ItemDetail = ({ item }) => {
    const { addItem } = useCart()
    const categoryLabel = item.category
        ? CATEGORY_LABELS[item.category] || item.category
        : null

    return (
        <article className="detail-layout">
            {/* Muestro la imagen principal del producto. */}
            <div className="detail-media">
                <img
                    className="detail-media__img"
                    src={item.image}
                    alt={item.name}
                />
            </div>

            {/* En este bloque muestro la información y las acciones del producto. */}
            <div className="detail-info">
                {categoryLabel && (
                    <span className="category-chip detail-chip">{categoryLabel}</span>
                )}
                <h2 className="detail-title">{item.name}</h2>

                {/* Muestro el precio y el botón para agregar al carrito. */}
                <div className="detail-buy">
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

                {/* Muestro la descripción completa del producto. */}
                <p className="detail-description">{item.description}</p>
            </div>
        </article>
    )
}