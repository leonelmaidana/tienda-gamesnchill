import { Navigate } from 'react-router-dom'

// Protege una ruta: si el usuario no está autenticado lo redirige a otra ruta.
const PrivateRoute = ({ isAuthenticated, redirectTo = '/', children }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PrivateRoute
