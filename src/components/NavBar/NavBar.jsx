import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'

const categories = ['Consolas', 'Pcs', 'Juegos', 'Accesorios']

const Navbar = () => {
  return (
    <header className="navbar">
      <a href="/" className="navbar__logo">
        Tienda Games n Chill
      </a>

      <nav className="navbar__right">
        <ul className="navbar__categories">
          {categories.map((category) => (
            <li key={category}>
              <a href="#" className="navbar__link">
                {category}
              </a>
            </li>
          ))}
        </ul>
        <CartWidget />
      </nav>
    </header>
  )
}

export default Navbar
