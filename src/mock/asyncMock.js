const products = [
  {
    id: '1',
    name: 'PlayStation 5 Slim',
    price: 899999,
    category: 'consolas',
    img: '/img/ps5.svg',
    stock: 8,
    description: 'Consola de última generación con SSD ultrarrápido, 1 TB de almacenamiento y gráficos en 4K.',
  },
  {
    id: '2',
    name: 'Xbox Series X',
    price: 849999,
    category: 'consolas',
    img: '/img/xbox.svg',
    stock: 5,
    description: 'La Xbox más potente: 12 teraflops, 1 TB SSD y compatibilidad con miles de juegos.',
  },
  {
    id: '3',
    name: 'Nintendo Switch OLED',
    price: 449999,
    category: 'consolas',
    img: '/img/switch.svg',
    stock: 12,
    description: 'Consola híbrida con pantalla OLED de 7 pulgadas. Jugá en el living o donde quieras.',
  },
  {
    id: '4',
    name: 'PC Gamer Ryzen 5 + RTX 4060',
    price: 1499999,
    category: 'pcs',
    img: '/img/pc-gamer.svg',
    stock: 3,
    description: 'AMD Ryzen 5, 16 GB de RAM DDR5, SSD NVMe de 1 TB y placa de video RTX 4060.',
  },
  {
    id: '5',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    price: 79999,
    category: 'juegos',
    img: '/img/zelda.svg',
    stock: 20,
    description: 'Aventura de mundo abierto para Nintendo Switch. Explorá Hyrule y los cielos.',
  },
  {
    id: '6',
    name: 'Elden Ring',
    price: 59999,
    category: 'juegos',
    img: '/img/elden-ring.svg',
    stock: 15,
    description: 'RPG de acción en un vasto mundo abierto creado por FromSoftware y George R. R. Martin.',
  },
  {
    id: '7',
    name: 'EA Sports FC 26',
    price: 69999,
    category: 'juegos',
    img: '/img/fc.svg',
    stock: 18,
    description: 'El simulador de fútbol más popular, con equipos, ligas y modos actualizados.',
  },
  {
    id: '8',
    name: 'Joystick DualSense',
    price: 109999,
    category: 'accesorios',
    img: '/img/dualsense.svg',
    stock: 25,
    description: 'Control inalámbrico con gatillos adaptativos y respuesta háptica para PS5.',
  },
  {
    id: '9',
    name: 'Auriculares Gamer con micrófono',
    price: 89999,
    category: 'accesorios',
    img: '/img/auriculares.svg',
    stock: 30,
    description: 'Auriculares con sonido envolvente, almohadillas memory foam y micrófono desmontable.',
  },
]

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 2000)
  })
}
