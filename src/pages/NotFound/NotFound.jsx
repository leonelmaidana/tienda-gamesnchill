import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  )
}

export default NotFound
