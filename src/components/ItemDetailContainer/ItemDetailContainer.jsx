import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../mock/asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError(null)
    setProduct(null)

    getProductById(id)
      .then((data) => {
        if (!ignore) setProduct(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  return (
    <section className="item-detail-container">
      {loading && <p className="item-detail-container__message">Cargando producto...</p>}
      {error && (
        <>
          <p className="item-detail-container__message item-detail-container__message--error">{error}</p>
          <p className="item-detail-container__message">
            <Link to="/">Volver al inicio</Link>
          </p>
        </>
      )}
      {!loading && !error && product && <ItemDetail product={product} />}
    </section>
  )
}

export default ItemDetailContainer
