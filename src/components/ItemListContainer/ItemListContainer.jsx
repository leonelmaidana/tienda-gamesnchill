import { useState, useEffect } from 'react'
import { getProducts } from '../../mock/asyncMock'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

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
