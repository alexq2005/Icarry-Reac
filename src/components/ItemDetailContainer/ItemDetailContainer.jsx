// busca un solo producto por el id de la url y se lo pasa a ItemDetail.

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemDetail } from "../ItemDetail/ItemDetail"

export const ItemDetailContainer = () => {
    const { id } = useParams()

    const [itemDetail, setItemDetail] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setItemDetail(null)
        setLoading(true)
        setError(null)

        fetch("/data/products.json")
            .then(res => res.json())
            .then(data => {
                const item = data.find(p => String(p.id) === id)
                if (!item) throw new Error("Producto no encontrado")
                setItemDetail(item)
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p>Cargando...</p>
    if (error) return <p>{error}</p>
    if (!itemDetail) return <p>Producto no encontrado</p>

    return (
        <section>
            <h1 className="text-secondary">Detalles del producto</h1>
            <ItemDetail item={itemDetail} />
        </section>
    )
}
