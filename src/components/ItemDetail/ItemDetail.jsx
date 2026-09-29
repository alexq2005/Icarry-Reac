/*------------------------------------------------------------*/
/*                     detalle del producto                     */
/*------------------------------------------------------------*/
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
  /*------------------------------------------------------------*/
  /*                     accion del boton                       */
  /*------------------------------------------------------------*/
  const { addItem } = useContext(CartContext);

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
