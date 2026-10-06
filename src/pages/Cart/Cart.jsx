import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import './Cart.css'

const formatPrice = (value) => `$${value.toLocaleString('es-AR')}`

const Cart = () => {
  const { cart, removeItem, clear, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <main className="cart cart--empty">
        <h1>Tu carrito está vacío</h1>
        <p>Todavía no agregaste productos.</p>
        <Link to="/" className="cart__link">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main className="cart">
      <h1>Tu carrito</h1>

      <ul className="cart__list">
        {cart.map((item) => (
          <li key={item.id} className="cart__item">
            <img className="cart__img" src={item.img} alt={item.name} />
            <div className="cart__info">
              <h2 className="cart__name">{item.name}</h2>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: {formatPrice(item.price)}</p>
              <p className="cart__subtotal">Subtotal: {formatPrice(item.price * item.quantity)}</p>
            </div>
            <button className="cart__remove" onClick={() => removeItem(item.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <section className="cart__summary">
        <p className="cart__total">Total: {formatPrice(totalPrice)}</p>
        <div className="cart__actions">
          <button className="cart__clear" onClick={clear}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="cart__checkout">
            Finalizar compra
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Cart
