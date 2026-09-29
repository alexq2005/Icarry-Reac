/*------------------------------------------------------------*/
/*                     detalle del producto                     */
/*------------------------------------------------------------*/
import { useCart } from "../../context/CartContext";
import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
  /*------------------------------------------------------------*/
  /*                     accion del boton                       */
  /*------------------------------------------------------------*/
  const { addItem } = useCart();

  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <button className="btn bg-primary text-dark" onClick={() => addItem(item)}>
          Agregar al carrito
        </button>
      </Item>
    </div>
  );
};
