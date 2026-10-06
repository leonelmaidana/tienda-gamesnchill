// Devuelve un objeto con los errores por campo. Si está vacío, el formulario es válido.
export const validateCheckoutForm = ({ fullName, phone, address, city }) => {
  const errors = {}

  if (fullName.trim().length < 3) {
    errors.fullName = 'Ingresá tu nombre y apellido.'
  }

  if (!/^[0-9+\s-]{8,15}$/.test(phone.trim())) {
    errors.phone = 'Ingresá un teléfono válido (entre 8 y 15 dígitos).'
  }

  if (address.trim().length < 5) {
    errors.address = 'Ingresá una dirección de entrega.'
  }

  if (city.trim().length < 2) {
    errors.city = 'Ingresá tu ciudad.'
  }

  return errors
}
