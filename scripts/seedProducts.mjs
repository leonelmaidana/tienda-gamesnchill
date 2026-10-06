// Carga el catálogo de data/products.json en la colección "products" de Firestore.
// Uso: GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json npm run seed
import { readFileSync } from 'node:fs'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const products = JSON.parse(readFileSync(new URL('../data/products.json', import.meta.url), 'utf8'))

initializeApp({ credential: applicationDefault() })
const db = getFirestore()

const batch = db.batch()

products.forEach(({ id, ...product }) => {
  batch.set(db.collection('products').doc(id), product)
})

await batch.commit()
console.log(`Se cargaron ${products.length} productos en Firestore.`)
