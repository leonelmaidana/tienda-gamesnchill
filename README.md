V1
Tienda Games n chill
Tienda de videojuegos

Tecnologías utilizadas:
React,HTML,JS

Instrucciones para instalar y ejecutar la aplicación:
cd tienda-react

npm install

npm run dev

V2:
Se creo Navbar,ItemList y CartWidget

V3:
Listado dinámico de productos.
- `src/mock/asyncMock.js`: exporta `getProducts`, una Promise que se resuelve a los 2 segundos con el array de productos (id, name, price, category, img, stock, description).
- `ItemListContainer`: obtiene los productos con `useState` + `useEffect` y muestra un mensaje de carga mientras espera.
- `ItemList`: recibe `products` y los mapea, usando `key={product.id}`.
- `Item`: tarjeta individual con imagen, categoría, nombre, descripción, precio y stock.
- Las imágenes son SVG locales en `public/img`.

V4:
Detalle de producto.
- `getProductById(productId)` en `src/mock/asyncMock.js`: Promise con `setTimeout` que resuelve el producto con ese `id` y rechaza si no existe.
- `ItemDetailContainer`: recibe `productId` (por defecto `'1'`), llama a `getProductById` en un `useEffect`, guarda el producto en un estado y maneja carga y error. Delega la vista a `ItemDetail`.
- `ItemDetail`: muestra imagen, nombre, precio, categoría, descripción, stock, marca, garantía, envío y medios de pago.
- `ItemCount`: contador con la lógica separada; recibe `stock`, no supera el stock ni baja de 0, y avisa la cantidad con `onAdd`.

V5 (checkpoint-3):
Navegación con React Router (`react-router-dom`).

Rutas:
- `/`: muestra todos los productos.
- `/category/:id`: muestra solo los productos de esa categoría (`consolas`, `pcs`, `juegos`, `accesorios`).
- `/item/:id`: detalle del producto (imagen, nombre, precio, descripción, stock, etc.).
- `/admin`: zona privada. Si el usuario no está autenticado se lo redirige a `/` (ver `isAuthenticated` en `App.jsx`).
- `*`: página 404.

Cambios y componentes nuevos:
- `App.jsx`: define `BrowserRouter` y las rutas. `Navbar` queda fuera de `Routes`, por lo que `Navbar` y `CartWidget` se ven en todas las rutas.
- `Navbar`: usa `Link` y `NavLink` (resalta la categoría activa). Las categorías salen de `src/config/categories.js`.
- `ItemListContainer`: lee el id con `useParams` y llama a `getProducts(categoryId)`; vuelve a pedir los datos cuando cambia la categoría.
- `ItemDetailContainer`: lee el id con `useParams` y llama a `getProductById`; si el producto no existe muestra un error con un link para volver.
- `Item`: agrega el link "Ver detalle" a `/item/:id` y un link a su categoría.
- `PrivateRoute`: componente que usa `Navigate` para redirigir si no hay permiso.
- `pages/Admin` y `pages/NotFound`: vistas de la zona privada y del 404.
- `getProducts(categoryId)` en `asyncMock.js`: filtra por categoría cuando recibe un id.

Nota: ahora hay que correr `npm install` para instalar `react-router-dom`.

V6 (checkpoint-4):
Carrito de compras con Context API.
- `src/context/CartContext.jsx`: exporta `CartContext` y `CartProvider`, que administra el estado `cart` (array) con `addItem(item, quantity)`, `removeItem(itemId)`, `clear()` e `isInCart(id)`. Todas las actualizaciones son inmutables (`map`, `filter`, spread). Si el producto ya está en el carrito se suma la cantidad (sin superar el stock) en lugar de duplicarlo. También expone `totalQuantity` y `totalPrice`, calculados a partir de `cart`.
- `src/hooks/useCart.js`: hook que consume el contexto.
- `App.jsx`: `CartProvider` envuelve a `BrowserRouter`, así todos los componentes acceden al carrito. Nueva ruta `/cart`.
- `ItemDetail`: al presionar "Agregar al carrito" en `ItemCount` llama a `addItem(product, quantity)`; después muestra "Terminar mi compra" (va a `/cart`) y "Seguir comprando".
- `pages/Cart`: si el carrito está vacío muestra un mensaje y un link al catálogo; si no, lista nombre, cantidad, precio unitario y subtotal de cada producto con un botón "Eliminar", el total, "Vaciar carrito" y un placeholder de "Finalizar compra".
- `CartWidget`: link a `/cart` que muestra la suma de las cantidades del carrito; si está vacío no muestra el número.
