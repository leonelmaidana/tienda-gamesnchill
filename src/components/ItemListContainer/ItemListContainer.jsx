import './ItemListContainer.css'

const ItemListContainer = ({ greeting }) => {
  return (
    <main className="item-list-container">
      <h1 className="item-list-container__greeting">{greeting}</h1>
    </main>
  )
}

export default ItemListContainer
