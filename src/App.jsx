import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { CartProvider } from './context/CartContext'
import Cart from './pages/Cart/Cart'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound/NotFound'

// Simulación de autenticación: cambiar a true para acceder a /admin.
const isAuthenticated = false

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Bienvenido a Tienda Games n Chill" />}
          />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} redirectTo="/">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
    </CartProvider>
  )

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Bienvenido a Tienda Games n Chill" />}
          />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} redirectTo="/">
                <Admin />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
import './App.css';
import Navbar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemListContainer greeting="Bienvenido a Tienda Games n Chill" />
      <ItemDetailContainer productId="1" />
    </div>

  );
}

export default App
