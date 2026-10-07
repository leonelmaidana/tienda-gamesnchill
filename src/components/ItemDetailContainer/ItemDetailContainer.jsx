import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../services/productsService'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loader from '../Loader/Loader'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const loadProduct = async () => {
      setLoading(true)
      setError(null)
      setProduct(null)

      try {
        const data = await getProductById(id)
        if (!ignore) setProduct(data)
      } catch (err) {
        console.error(err)
        if (!ignore) {
          setError(
            err.code === 'not-found'
              ? err.message
              : 'No se pudo cargar el producto. Intentá nuevamente más tarde.'
          )
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      ignore = true
    }
  }, [id])

  return (
    <section className="item-detail-container">
      {loading && <Loader message="Cargando producto..." />}
      {error && (
        <>
          <p className="item-detail-container__message item-detail-container__message--error">{error}</p>
          <p className="item-detail-container__message">
            <Link to="/">Volver al catálogo</Link>
          </p>
        </>
      )}
      {product && <ItemDetail product={product} />}
    </section>
  )
}

export default ItemDetailContainer
