/*------------------------------------------------------------*/
/*                     contenedor de detalle                   */
/*------------------------------------------------------------*/
/* Lee el :id de la URL, busca el producto en products.json
   y se lo pasa a ItemDetail. El flag cancelled evita setState
   si el usuario cambia de ruta antes de que termine el fetch. */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemDetail } from "../ItemDetail/ItemDetail"

export const ItemDetailContainer = () => {
    /*----- params y estado -----*/
    const { id } = useParams()
    const [result, setResult] = useState(null)

    /*----- carga del producto -----*/
    useEffect(() => {
        let cancelled = false

        fetch("/data/products.json")
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar el producto")
                return res.json()
            })
            .then(data => {
                const item = data.find(p => String(p.id) === id)
                if (!item) throw new Error("Producto no encontrado")
                if (!cancelled) setResult({ id, item, error: null })
            })
            .catch(err => {
                if (!cancelled) setResult({ id, item: null, error: err.message })
            })

        return () => {
            cancelled = true
        }
    }, [id])

    /*----- estados de UI -----*/
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

    return (
        <section className="detail-page">
            <h1 className="text-secondary">Detalles del producto</h1>
            <ItemDetail item={result.item} />
        </section>
    )
}