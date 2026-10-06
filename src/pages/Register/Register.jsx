import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AuthForm from '../../components/AuthForm/AuthForm'

const Register = () => {
  const { user, register } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleRegister = async (email, password) => {
    await register(email, password)
    navigate('/', { replace: true })
  }

  return (
    <AuthForm
      title="Crear cuenta"
      submitLabel="Registrarme"
      requireConfirm
      onSubmit={handleRegister}
      footerText="¿Ya tenés cuenta?"
      footerLinkTo="/login"
      footerLinkLabel="Iniciá sesión"
    />
  )
}

export default Register
