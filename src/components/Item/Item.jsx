import './Item.css'

const Item = ({ name, price, img, category, stock, description }) => {
  return (
    <article className="item">
      <img className="item__img" src={img} alt={name} />
      <div className="item__body">
        <span className="item__category">{category}</span>
        <h2 className="item__name">{name}</h2>
        <p className="item__description">{description}</p>
        <div className="item__footer">
          <span className="item__price">${price.toLocaleString('es-AR')}</span>
          <span className="item__stock">Stock: {stock}</span>
        </div>
      </div>
    </article>
  )
}

export default Item
