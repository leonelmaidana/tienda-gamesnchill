import { Link, NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import useAuth from '../../hooks/useAuth'
import { categories } from '../../config/categories'
import './Navbar.css'

const Navbar = () => {
  const { user, loading, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error(err)
      alert('No se pudo cerrar la sesión. Intentá nuevamente.')
    }
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        Tienda Games n Chill
      </Link>

      <nav className="navbar__right">
        <ul className="navbar__categories">
          {categories.map((category) => (
            <li key={category.id}>
              <NavLink
                to={`/category/${category.id}`}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
              >
                {category.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {!loading && (
          <div className="navbar__auth">
            {user ? (
              <>
                <span className="navbar__user">{user.email}</span>
                <button className="navbar__button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__link">
                  Ingresar
                </Link>
                <Link to="/register" className="navbar__button navbar__button--link">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        )}

        <CartWidget />
      </nav>
    </header>
  )
}

export default Navbar
