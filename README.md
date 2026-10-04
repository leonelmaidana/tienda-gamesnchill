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
