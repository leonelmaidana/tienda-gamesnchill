import Item from '../Item/Item'
import './ItemList.css'

const ItemList = ({ products }) => {
  return (
    <section className="item-list">
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </section>
  )
}

export default ItemList
