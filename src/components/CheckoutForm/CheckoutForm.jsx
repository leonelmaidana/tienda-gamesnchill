import './CheckoutForm.css'

const fields = [
  { name: 'fullName', label: 'Nombre y apellido', type: 'text', autoComplete: 'name' },
  { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
  { name: 'address', label: 'Dirección', type: 'text', autoComplete: 'street-address' },
  { name: 'city', label: 'Ciudad', type: 'text', autoComplete: 'address-level2' },
]

const CheckoutForm = ({ values, errors, onChange, onSubmit, submitting }) => {
  return (
    <form className="checkout-form" onSubmit={onSubmit} noValidate>
      <h2 className="checkout-form__title">Datos de entrega</h2>

      {fields.map(({ name, label, type, autoComplete }) => (
        <label key={name} className="checkout-form__label">
          {label}
          <input
            className={errors[name] ? 'checkout-form__input checkout-form__input--error' : 'checkout-form__input'}
            type={type}
            name={name}
            value={values[name]}
            onChange={onChange}
            autoComplete={autoComplete}
          />
          {errors[name] && <span className="checkout-form__error">{errors[name]}</span>}
        </label>
      ))}

      <label className="checkout-form__label">
        Información adicional (opcional)
        <textarea
          className="checkout-form__input"
          name="notes"
          rows="3"
          value={values.notes}
          onChange={onChange}
          placeholder="Piso, departamento, horario de entrega, referencias..."
        />
      </label>

      <button className="checkout-form__submit" type="submit" disabled={submitting}>
        {submitting ? 'Generando orden...' : 'Confirmar compra'}
      </button>
    </form>
  )
}

export default CheckoutForm
