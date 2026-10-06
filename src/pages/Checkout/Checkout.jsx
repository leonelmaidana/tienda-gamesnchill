import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'
import { createOrder } from '../../services/ordersService'
import { validateCheckoutForm } from '../../utils/validateCheckoutForm'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'
import './Checkout.css'

const initialValues = { fullName: '', phone: '', address: '', city: '', notes: '' }

const formatPrice = (value) => `$${value.toLocaleString('es-AR')}`

const Checkout = () => {
  const { user } = useAuth()
  const { cart, totalPrice, clear } = useCart()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [orderId, setOrderId] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError(null)

    if (!user) {
      setSubmitError('Tenés que iniciar sesión para finalizar la compra.')
      return
    }

    if (cart.length === 0) {
      setSubmitError('Tu carrito está vacío.')
      return
    }

    const validationErrors = validateCheckoutForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)

    try {
      const id = await createOrder({
        user,
        buyer: {
          fullName: values.fullName.trim(),
          phone: values.phone.trim(),
          address: values.address.trim(),
          city: values.city.trim(),
          notes: values.notes.trim(),
        },
        cart,
        total: totalPrice,
      })

      setOrderId(id)
      clear() // solo se vacía el carrito si la orden se creó correctamente
    } catch (err) {
      console.error(err)
      setSubmitError('No se pudo generar la orden. Tu carrito no se modificó, intentá nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderId) {
    return (
      <main className="checkout checkout--success">
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu compra fue registrada correctamente.</p>
        <p>
          ID de tu orden: <strong className="checkout__order-id">{orderId}</strong>
        </p>
        <Link to="/" className="checkout__link">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  if (cart.length === 0) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="checkout">
      <h1>Finalizar compra</h1>

      <div className="checkout__content">
        <section className="checkout__summary">
          <h2>Resumen de tu compra</h2>
          <p className="checkout__email">Cuenta: {user.email}</p>
          <ul className="checkout__list">
            {cart.map((item) => (
              <li key={item.id} className="checkout__item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="checkout__total">Total: {formatPrice(totalPrice)}</p>
        </section>

        <div className="checkout__form">
          <CheckoutForm
            values={values}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
          {submitError && (
            <p className="checkout__error" role="alert">
              {submitError}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Checkout
