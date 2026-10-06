import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../mock/asyncMock'
import { categories } from '../../config/categories'
import { getProducts } from '../../mock/asyncMock'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const ItemListContainer = ({ greeting }) => {
  const { id: categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    setLoading(true)

    getProducts(categoryId)
    getProducts()
      .then((data) => {
        if (!ignore) setProducts(data)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [categoryId])

  const category = categories.find((c) => c.id === categoryId)
  const title = categoryId ? `Categoría: ${category ? category.label : categoryId}` : greeting

  return (
    <main className="item-list-container">
      <h1 className="item-list-container__greeting">{title}</h1>

      {loading ? (
        <p className="item-list-container__loading">Cargando productos...</p>
      ) : products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <p className="item-list-container__loading">No hay productos en esta categoría.</p>
  }, [])

  return (
    <main className="item-list-container">
      <h1 className="item-list-container__greeting">{greeting}</h1>

      {loading ? (
        <p className="item-list-container__loading">Cargando productos...</p>
      ) : (
        <ItemList products={products} />
      )}
    </main>
  )
}

export default ItemListContainer
