import { Link, NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import { categories } from '../../config/categories'
import './Navbar.css'

const Navbar = () => {
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
        <CartWidget />
      </nav>
    </header>
  )
}

export default Navbar
