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
    if (!result || result.id !== id) return <p>Cargando...</p>
    if (result.error) return <p>{result.error}</p>
    if (!result.item) return <p>Producto no encontrado</p>

    return (
        <section>
            <h1 className="text-secondary">Detalles del producto</h1>
            <ItemDetail item={result.item} />
        </section>
    )
}
