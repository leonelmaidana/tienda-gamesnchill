import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({ id, name, price, img, category, stock, description }) => {
  return (
    <article className="item">
      <img className="item__img" src={img} alt={name} />
      <div className="item__body">
        <Link to={`/category/${category}`} className="item__category">
          {category}
        </Link>
        <h2 className="item__name">{name}</h2>
        <p className="item__description">{description}</p>
        <div className="item__footer">
          <span className="item__price">${price.toLocaleString('es-AR')}</span>
          <span className="item__stock">Stock: {stock}</span>
        </div>
        <Link to={`/item/${id}`} className="item__detail-link">
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default Item
