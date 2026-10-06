import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import './CartWidget.css'

const CartWidget = () => {
  const { totalQuantity } = useCart()

  return (
    <Link to="/cart" className="cart-widget" aria-label="Ir al carrito de compras">
      <span className="cart-widget__icon" role="img" aria-hidden="true">
        🛒
      </span>
      {totalQuantity > 0 && <span className="cart-widget__badge">{totalQuantity}</span>}
    </Link>
  )
}

export default CartWidget
