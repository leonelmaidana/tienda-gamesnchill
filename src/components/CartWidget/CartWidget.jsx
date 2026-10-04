import './CartWidget.css'

const CartWidget = () => {
  const cartCount = 3

  return (
    <div className="cart-widget" aria-label="Carrito de compras">
      <span className="cart-widget__icon" role="img" aria-hidden="true">
        🛒
      </span>
      <span className="cart-widget__badge">{cartCount}</span>
    </div>
  )
}

export default CartWidget
