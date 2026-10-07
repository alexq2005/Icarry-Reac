// busca un solo producto por el id de la url y se lo pasa a ItemDetail.

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemDetail } from "../ItemDetail/ItemDetail"

export const ItemDetailContainer = () => {
    const { id } = useParams()

    const [result, setResult] = useState(null)

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
