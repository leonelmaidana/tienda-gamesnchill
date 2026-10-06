import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Loader from '../Loader/Loader'

// Solo deja pasar a usuarios autenticados; si no, los redirige al login
// recordando a qué ruta querían entrar.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader message="Verificando sesión..." />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
import { Navigate } from 'react-router-dom'

// Protege una ruta: si el usuario no está autenticado lo redirige a otra ruta.
const PrivateRoute = ({ isAuthenticated, redirectTo = '/', children }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PrivateRoute
