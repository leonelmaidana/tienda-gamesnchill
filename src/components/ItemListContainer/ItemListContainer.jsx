import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../services/productsService'
import { categories } from '../../config/categories'
import ItemList from '../ItemList/ItemList'
import Loader from '../Loader/Loader'
import './ItemListContainer.css'

const ItemListContainer = ({ greeting }) => {
  const { id: categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getProducts(categoryId)
        if (!ignore) setProducts(data)
      } catch (err) {
        console.error(err)
        if (!ignore) setError('No se pudo cargar el catálogo. Intentá nuevamente más tarde.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      ignore = true
    }
  }, [categoryId])

  const category = categories.find((c) => c.id === categoryId)
  const title = categoryId ? `Categoría: ${category ? category.label : categoryId}` : greeting

  const renderContent = () => {
    if (loading) return <Loader message="Cargando productos..." />
    if (error) return <p className="item-list-container__error">{error}</p>
    if (products.length === 0) {
      return <p className="item-list-container__loading">No hay productos en esta categoría.</p>
    }
    return <ItemList products={products} />
  }

  return (
    <main className="item-list-container">
      <h1 className="item-list-container__greeting">{title}</h1>
      {renderContent()}
    </main>
  )
}

export default ItemListContainer
