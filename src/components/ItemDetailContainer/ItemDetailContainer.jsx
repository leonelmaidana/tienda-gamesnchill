import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../services/productsService'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loader from '../Loader/Loader'
import { getProductById } from '../../mock/asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
  const { id } = useParams()
const ItemDetailContainer = ({ productId = '1' }) => {
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
    setLoading(true)
    setError(null)
    setProduct(null)

    getProductById(id)

    getProductById(productId)
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
      {loading && <Loader message="Cargando producto..." />}
  }, [productId])

  return (
    <section className="item-detail-container">
      {loading && <p className="item-detail-container__message">Cargando producto...</p>}
      {error && (
        <>
          <p className="item-detail-container__message item-detail-container__message--error">{error}</p>
          <p className="item-detail-container__message">
            <Link to="/">Volver al catálogo</Link>
          </p>
        </>
      )}
      {product && <ItemDetail product={product} />}
            <Link to="/">Volver al inicio</Link>
          </p>
        </>
      )}
      {error && <p className="item-detail-container__message item-detail-container__message--error">{error}</p>}
      {!loading && !error && product && <ItemDetail product={product} />}
    </section>
  )
}

export default ItemDetailContainer
