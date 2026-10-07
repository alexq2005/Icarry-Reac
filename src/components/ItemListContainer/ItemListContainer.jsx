/*------------------------------------------------------------*/
/*                     contenedor del catalogo                 */
/*------------------------------------------------------------*/
/* Trae los productos de /data/products.json y se los pasa a ItemList.
   Si hay :category en la URL, filtra antes de renderizar. */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemList } from "../ItemList/ItemList"
import "./ItemListContainer.css"

export const ItemListContainer = () => {
    /*----- params y estado -----*/
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    /*----- carga / filtro por categoria -----*/
    useEffect(() => {
        setLoading(true)
        setErrors(null)

        fetch("/data/products.json")
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar los productos")
                return res.json()
            })
            .then(data => {
                if (category) {
                    setProducts(data.filter(p => p.category === category))
                } else {
                    setProducts(data)
                }
            })
            .catch(err => setErrors(err.message))
            .finally(() => setLoading(false))
    }, [category])

    /*----- estados de UI -----*/
    if (loading) return <p>Cargando...</p>
    if (errors) return <p>{errors}</p>

    return (
        <section className="seccion-productos">
            {/*----- presentacion de la tienda -----*/}
            <div className="introduccion-tienda">
                <span className="etiqueta-seccion">Mercado de coleccionistas</span>
                <h1 className="titulo-home text-secondary">Bienvenidos a la tienda</h1>
                <p className="parrafo">
                    En iCarry encontrarás los items más buscados de Dota 2: Arcanas,
                    Personas, sets inmortal y bundles exclusivos. Trades verificados,
                    entrega inmediata y los mejores precios del mercado para mejorar tu
                    colección sin vueltas.
                </p>
            </div>

            {/*----- encabezado del listado -----*/}
            <div className="encabezado-productos">
                <span className="linea-encabezado" aria-hidden="true" />
                <h2>Nuestros productos</h2>
                <span className="linea-encabezado" aria-hidden="true" />
            </div>
            <ItemList products={products} />
        </section>
    )
}
