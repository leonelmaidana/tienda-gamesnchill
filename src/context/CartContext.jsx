import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const isInCart = (id) => cart.some((item) => item.id === id)

  const addItem = (item, quantity) => {
    if (quantity <= 0) return

    setCart((prevCart) => {
      const exists = prevCart.some((cartItem) => cartItem.id === item.id)

      if (exists) {
        // Suma la cantidad al item existente sin duplicarlo (sin superar el stock).
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.min(cartItem.quantity + quantity, item.stock ?? Infinity),
              }
            : cartItem
        )
      }

      return [...prevCart, { ...item, quantity: Math.min(quantity, item.stock ?? Infinity) }]
    })
  }

  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const clear = () => {
    setCart([])
  }

  // Valores derivados del estado: no necesitan un useState propio.
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clear, isInCart, totalQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}
