const products = [
  {
    id: '1',
    brand: 'Sony',
    warranty: '12 meses',
    name: 'PlayStation 5 Slim',
    price: 899999,
    category: 'consolas',
    img: '/img/ps5.svg',
    stock: 8,
    description: 'Consola de última generación con SSD ultrarrápido, 1 TB de almacenamiento y gráficos en 4K.',
  },
  {
    id: '2',
    brand: 'Microsoft',
    warranty: '12 meses',
    name: 'Xbox Series X',
    price: 849999,
    category: 'consolas',
    img: '/img/xbox.svg',
    stock: 5,
    description: 'La Xbox más potente: 12 teraflops, 1 TB SSD y compatibilidad con miles de juegos.',
  },
  {
    id: '3',
    brand: 'Nintendo',
    warranty: '12 meses',
    name: 'Nintendo Switch OLED',
    price: 449999,
    category: 'consolas',
    img: '/img/switch.svg',
    stock: 12,
    description: 'Consola híbrida con pantalla OLED de 7 pulgadas. Jugá en el living o donde quieras.',
  },
  {
    id: '4',
    brand: 'Armado a medida',
    warranty: '24 meses',
    name: 'PC Gamer Ryzen 5 + RTX 4060',
    price: 1499999,
    category: 'pcs',
    img: '/img/pc-gamer.svg',
    stock: 3,
    description: 'AMD Ryzen 5, 16 GB de RAM DDR5, SSD NVMe de 1 TB y placa de video RTX 4060.',
  },
  {
    id: '5',
    brand: 'Nintendo',
    warranty: 'Sin garantía (producto digital/físico sellado)',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    price: 79999,
    category: 'juegos',
    img: '/img/zelda.svg',
    stock: 20,
    description: 'Aventura de mundo abierto para Nintendo Switch. Explorá Hyrule y los cielos.',
  },
  {
    id: '6',
    brand: 'Bandai Namco',
    warranty: 'Sin garantía (producto sellado)',
    name: 'Elden Ring',
    price: 59999,
    category: 'juegos',
    img: '/img/elden-ring.svg',
    stock: 15,
    description: 'RPG de acción en un vasto mundo abierto creado por FromSoftware y George R. R. Martin.',
  },
  {
    id: '7',
    brand: 'EA Sports',
    warranty: 'Sin garantía (producto sellado)',
    name: 'EA Sports FC 26',
    price: 69999,
    category: 'juegos',
    img: '/img/fc.svg',
    stock: 18,
    description: 'El simulador de fútbol más popular, con equipos, ligas y modos actualizados.',
  },
  {
    id: '8',
    brand: 'Sony',
    warranty: '6 meses',
    name: 'Joystick DualSense',
    price: 109999,
    category: 'accesorios',
    img: '/img/dualsense.svg',
    stock: 25,
    description: 'Control inalámbrico con gatillos adaptativos y respuesta háptica para PS5.',
  },
  {
    id: '9',
    brand: 'HyperX',
    warranty: '12 meses',
    name: 'Auriculares Gamer con micrófono',
    price: 89999,
    category: 'accesorios',
    img: '/img/auriculares.svg',
    stock: 30,
    description: 'Auriculares con sonido envolvente, almohadillas memory foam y micrófono desmontable.',
  },
]

export const getProducts = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        categoryId
          ? products.filter((p) => p.category === categoryId)
          : products
      )
    }, 2000)
  })
}

export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === String(productId))

      if (product) {
        resolve(product)
      } else {
        reject(new Error(`No existe el producto con id ${productId}`))
      }
    }, 1500)
  })
}
