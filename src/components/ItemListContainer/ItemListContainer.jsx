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
            "Equipá a tus héroes como verdaderas leyendas: Arcanas que iluminan el campo, Personas que reescriben su destino e Immortals dignos de una Ancient. Cada cosmético es botín de gloria listo para tu inventario, con entrega rápida y trades que no te dejan en la base. Elegí tu arsenal, dominá la partida y que te vean venir desde la fountain.",
    },
    "merchandising": {
        title: "Merchandising",
        description:
            "La batalla no termina cuando cae el Ancient: llevala al mundo real con figuras, remeras, posters y trofeos de fan. Armá tu setup como un trono de campeón o regalale a tu ally el recuerdo de mil ranked. Merch para quienes viven Dota 2 también fuera del mapa, con estilo digno de Radiant y Dire.",
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
                            En iCarry se juntan las leyendas: un mercado épico para
                            coleccionistas de Dota 2 donde cada hallazgo es una victoria.
                            Explorá el catálogo completo o elegí tu bando —items digitales
                            para el inventario o merch para el mundo real— con la confianza
                            de trades verificados. Acá no solo comprás: armás tu legado
                            entre Radiant y Dire.
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