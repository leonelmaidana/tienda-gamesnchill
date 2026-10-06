import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(stock > 0 ? initial : 0)

  const increment = () => {
    if (count < stock) setCount(count + 1)
  }

  const decrement = () => {
    if (count > 0) setCount(count - 1)
  }

  return (
    <div className="item-count">
      <div className="item-count__controls">
        <button
          className="item-count__btn"
          onClick={decrement}
          disabled={count <= 0}
          aria-label="Restar una unidad"
        >
          −
        </button>
        <span className="item-count__value">{count}</span>
        <button
          className="item-count__btn"
          onClick={increment}
          disabled={count >= stock}
          aria-label="Sumar una unidad"
        >
          +
        </button>
      </div>
      <button
        className="item-count__add"
        onClick={() => onAdd && onAdd(count)}
        disabled={count === 0}
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount
