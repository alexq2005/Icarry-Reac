/*------------------------------------------------------------*/
/*                     contenedor del catalogo                 */
/*------------------------------------------------------------*/
/* Trae los productos de /data/products.json y se los pasa a ItemList.
   Si hay :category en la URL, filtra antes de renderizar. */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemList } from "../ItemList/ItemList"
import "./ItemListContainer.css"

const categoryInfo = {
    "items-del-juego": {
        title: "Items del juego",
        description:
            "Cosméticos digitales para tu héroe: Arcanas, Personas, Immortals y bundles con efectos únicos. Comprás seguro, recibís al toque y actualizás tu inventario sin vueltas.",
    },
    "merchandising": {
        title: "Merchandising",
        description:
            "Productos físicos para fans de Dota 2: figuras, remeras, posters y más. Para armar tu setup, regalar o lucir el juego fuera de la partida.",
    },
}

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

    const currentCategory = category ? categoryInfo[category] : null

    return (
        <section className="seccion-productos">
            {/*----- presentacion de la tienda (solo en inicio) -----*/}
            {!category && (
                <>
                    <div className="introduccion-tienda">
                        <span className="etiqueta-seccion">Mercado de coleccionistas</span>
                        <h1 className="titulo-home text-secondary">Bienvenidos a la tienda</h1>
                        <p className="parrafo">
                            iCarry es tu punto de encuentro para coleccionistas de Dota 2:
                            catálogo curado, trades verificados y precios competitivos,
                            todo en un solo lugar.
                        </p>
                    </div>

                    <div className="encabezado-productos">
                        <span className="linea-encabezado" aria-hidden="true" />
                        <h2>Nuestros productos</h2>
                        <span className="linea-encabezado" aria-hidden="true" />
                    </div>
                </>
            )}

            {/*----- titulo + descripcion de categoria -----*/}
            {currentCategory && (
                <div className="introduccion-tienda">
                    <h1 className="titulo-home text-secondary">{currentCategory.title}</h1>
                    <p className="parrafo">{currentCategory.description}</p>
                </div>
            )}

            {/* Fallback si la categoria no esta mapeada */}
            {category && !currentCategory && (
                <div className="encabezado-productos">
                    <span className="linea-encabezado" aria-hidden="true" />
                    <h2>{category}</h2>
                    <span className="linea-encabezado" aria-hidden="true" />
                </div>
            )}

            <ItemList products={products} />
        </section>
    )
}