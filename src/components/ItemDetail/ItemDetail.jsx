import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import useCart from '../../hooks/useCart'
import { useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

const ItemDetail = ({ product }) => {
  const { name, price, img, category, description, stock, brand, warranty } = product
  const { addItem, isInCart } = useCart()

  const handleAdd = (quantity) => {
    addItem(product, quantity)
  const [added, setAdded] = useState(0)

  const handleAdd = (quantity) => {
    setAdded(quantity)
  }

  return (
    <article className="item-detail">
      <img className="item-detail__img" src={img} alt={name} />

      <div className="item-detail__info">
        <span className="item-detail__category">{category}</span>
        <h2 className="item-detail__name">{name}</h2>
        <p className="item-detail__price">${price.toLocaleString('es-AR')}</p>
        <p className="item-detail__description">{description}</p>

        <ul className="item-detail__extras">
          <li><strong>Marca:</strong> {brand}</li>
          <li><strong>Garantía:</strong> {warranty}</li>
          <li><strong>Envío:</strong> Gratis a todo el país</li>
          <li><strong>Pago:</strong> Hasta 12 cuotas sin interés</li>
        </ul>

        <p className={stock > 0 ? 'item-detail__stock' : 'item-detail__stock item-detail__stock--out'}>
          {stock > 0 ? `Stock disponible: ${stock} unidades` : 'Sin stock'}
        </p>

        {isInCart(product.id) ? (
          <div className="item-detail__actions">
            <p className="item-detail__added">Producto agregado al carrito.</p>
            <Link to="/cart" className="item-detail__checkout">
              Terminar mi compra
            </Link>
            <Link to="/" className="item-detail__continue">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />

        {added > 0 && (
          <p className="item-detail__added">
            Agregaste {added} {added === 1 ? 'unidad' : 'unidades'} al carrito.
          </p>
        )}
      </div>
    </article>
  )
}

export default ItemDetail
