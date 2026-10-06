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
