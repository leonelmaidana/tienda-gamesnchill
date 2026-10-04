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
