# Tienda Games n Chill

E-commerce de videojuegos desarrollado con React y Firebase. Permite navegar el catálogo por categorías (consolas, PCs, juegos y accesorios), ver el detalle de cada producto, armar un carrito, registrarse e iniciar sesión, y completar una compra mediante un checkout protegido que guarda la orden en Cloud Firestore.

## Tecnologías utilizadas

- React 19 + Vite
- React Router (`react-router-dom`)
- Firebase: Cloud Firestore y Firebase Authentication (email y contraseña)
- Context API (`AuthContext` y `CartContext`)
- CSS plano (un archivo por componente)

## Instalación y ejecución

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Crear el archivo `.env` a partir de `.env.example` y completarlo con los datos de tu proyecto de Firebase (Configuración del proyecto → Tus apps → Web).

3. Ejecutar la aplicación:

   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | API key de la app web |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticación |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de almacenamiento |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID del remitente de mensajes |
| `VITE_FIREBASE_APP_ID` | ID de la app |

El archivo `.env` está en `.gitignore` y no se sube al repositorio.

## Configuración de Firebase

1. Crear un proyecto en la [consola de Firebase](https://console.firebase.google.com/).
2. Habilitar **Authentication → Método de acceso → Correo electrónico/contraseña**.
3. Crear la base de datos **Cloud Firestore**.
4. Copiar las reglas de [`firestore.rules`](./firestore.rules) en Firestore → Reglas y publicarlas.
5. Cargar el catálogo (ver más abajo).

### Carga del catálogo

El catálogo de ejemplo está en [`data/products.json`](./data/products.json). Para cargarlo en la colección `products`:

1. En Firebase: Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada. Guardar el archivo como `serviceAccountKey.json` en la raíz del proyecto (está en `.gitignore`, no lo subas).
2. Ejecutar:

   ```bash
   # macOS / Linux
   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json npm run seed

   # Windows (PowerShell)
   $env:GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"; npm run seed
   ```

También podés crear los documentos manualmente desde la consola de Firestore.

## Colecciones de Firestore

### `products`

Catálogo. El ID del documento es el ID del producto. Lectura pública, escritura bloqueada desde la aplicación.

```json
{
  "name": "PlayStation 5 Slim",
  "description": "Consola de última generación con SSD ultrarrápido...",
  "price": 899999,
  "category": "consolas",
  "img": "/img/ps5.svg",
  "stock": 8,
  "brand": "Sony",
  "warranty": "12 meses"
}
```

### `orders`

Órdenes de compra. Solo pueden crearlas usuarios autenticados y cada usuario solo puede leer las suyas.

```json
{
  "userId": "uid-del-usuario",
  "userEmail": "usuario@mail.com",
  "buyer": {
    "fullName": "Ana Pérez",
    "phone": "+54 11 5555-1234",
    "address": "Calle Falsa 123",
    "city": "Buenos Aires",
    "notes": "Piso 2, depto B"
  },
  "items": [
    { "id": "1", "name": "PlayStation 5 Slim", "price": 899999, "quantity": 1 }
  ],
  "total": 899999,
  "createdAt": "serverTimestamp()"
}
```

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Todos los productos |
| `/category/:id` | Productos de una categoría (consulta con `query` + `where`) |
| `/item/:id` | Detalle del producto (`doc` + `getDoc`) |
| `/cart` | Carrito |
| `/login` | Inicio de sesión |
| `/register` | Registro |
| `/checkout` | Checkout (protegido: requiere sesión y carrito con productos) |

## Estructura del proyecto

```
src/
├── firebase/config.js          # Inicializa Firebase y exporta db y auth
├── services/                   # Lógica de acceso a Firestore
│   ├── productsService.js
│   └── ordersService.js
├── context/                    # AuthContext y CartContext
├── hooks/                      # useAuth y useCart
├── utils/                      # Validación del checkout y mensajes de error de auth
├── config/categories.js
├── components/                 # Navbar, CartWidget, ItemListContainer, ItemList, Item,
│                               # ItemDetailContainer, ItemDetail, ItemCount, AuthForm,
│                               # CheckoutForm, PrivateRoute, Loader
└── pages/                      # Cart, Checkout, Login, Register, NotFound
```

## Funcionalidades

- **Catálogo desde Firestore**: `ItemListContainer` e `ItemDetailContainer` consultan Firestore con indicadores de carga y mensajes de error.
- **Autenticación**: `AuthContext` expone `user`, `loading`, `register`, `login` y `logout`, y usa `onAuthStateChanged` para mantener la sesión al recargar. La barra de navegación muestra el email y el botón para cerrar sesión.
- **Checkout protegido**: `PrivateRoute` redirige al login a los usuarios sin sesión, y el checkout redirige al catálogo si el carrito está vacío.
- **Órdenes**: al confirmar, se validan el usuario, el carrito y el formulario, se crea la orden con `addDoc` y `serverTimestamp()`, se muestra el ID generado y recién entonces se vacía el carrito. Si falla, el carrito se conserva y se informa el error.
- **Seguridad**: las reglas de Firestore (`firestore.rules`) permiten crear órdenes solo a usuarios autenticados.
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
