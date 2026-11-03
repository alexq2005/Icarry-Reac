/* -------------------------------------------------------------------------- */
/*                   DETALLE DEL PRODUCTO CON BOTON AGREGAR                   */
/* -------------------------------------------------------------------------- */

import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";
import { CATEGORY_LABELS } from "../../utils/categoryLabels";
import { formatPrice } from "../../utils/formatPrice";

export const ItemDetail = ({ item }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const categoryLabel = item.category
    ? CATEGORY_LABELS[item.category] || item.category
    : null;

  return (
    <article className="detail-layout">
      {/* -------------------------------------------------------------------------- */}
      {/*                            IMAGEN DEL PRODUCTO                             */}
      {/* -------------------------------------------------------------------------- */}
      <div className="detail-media">
        <img className="detail-media-img" src={item.image} alt={item.name} />
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/*                         CATEGORIA, NOMBRE Y COMPRA                         */}
      {/* -------------------------------------------------------------------------- */}
      <div className="detail-info">
        {categoryLabel && (
          <span className="category-chip detail-chip">{categoryLabel}</span>
        )}
        <h2 className="detail-title">{item.name}</h2>

        {/* -------------------------------------------------------------------------- */}
        {/*                     PRECIO Y BOTON AGREGAR AL CARRITO                      */}
        {/* -------------------------------------------------------------------------- */}
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

        {/* -------------------------------------------------------------------------- */}
        {/*                            DESCRIPCION COMPLETA                            */}
        {/* -------------------------------------------------------------------------- */}
        <p className="detail-description">{item.description}</p>

        {/* -------------------------------------------------------------------------- */}
        {/*                        VUELVO A LA PAGINA ANTERIOR                         */}
        {/* -------------------------------------------------------------------------- */}
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>
      </div>
    </article>
  );
};
