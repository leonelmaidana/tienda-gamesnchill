import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AuthForm from '../../components/AuthForm/AuthForm'

const Login = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/'

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  const handleLogin = async (email, password) => {
    await login(email, password)
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthForm
      title="Iniciar sesión"
      submitLabel="Ingresar"
      onSubmit={handleLogin}
      footerText="¿No tenés cuenta?"
      footerLinkTo="/register"
      footerLinkLabel="Registrate"
    />
  )
}

export default Login
