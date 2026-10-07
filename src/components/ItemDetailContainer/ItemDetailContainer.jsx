/* Busco el producto usando el id de la URL y después muestro su detalle. */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemDetail } from "../ItemDetail/ItemDetail"

export const ItemDetailContainer = () => {
    /* Leo el id de la URL y guardo el resultado de la búsqueda. */
    const { id } = useParams()
    const [result, setResult] = useState(null)

    /* Cargo los productos y busco el que coincide con el id. */
    useEffect(() => {
        let cancelled = false

        fetch("/data/products.json")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar el producto")
                return res.json()
            })
            .then((data) => {
                const item = data.find((p) => String(p.id) === id)
                if (!item) throw new Error("Producto no encontrado")
                if (!cancelled) setResult({ id, item, error: null })
            })
            .catch((err) => {
                if (!cancelled) setResult({ id, item: null, error: err.message })
            })

        return () => {
            cancelled = true
        }
    }, [id])

    /* Muestro un mensaje mientras carga o si ocurre un error. */
    if (!result || result.id !== id) {
        return (
            <section className="detail-page">
                <p>Cargando...</p>
            </section>
        )
    }
    if (result.error) {
        return (
            <section className="detail-page">
                <p>{result.error}</p>
            </section>
        )
    }
    if (!result.item) {
        return (
            <section className="detail-page">
                <p>Producto no encontrado</p>
            </section>
        )
    }

    /* Cuando encuentro el producto, muestro su información. */
    return (
        <section className="detail-page">
            <h1 className="text-secondary">Detalles del producto</h1>
            <ItemDetail item={result.item} />
        </section>
    )
}