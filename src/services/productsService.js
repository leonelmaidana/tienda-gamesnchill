import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

const productsCollection = collection(db, 'products')

const toProduct = (snapshot) => ({ id: snapshot.id, ...snapshot.data() })

// Devuelve todos los productos o, si recibe una categoría, solo los de esa categoría.
export const getProducts = async (categoryId) => {
  const productsQuery = categoryId
    ? query(productsCollection, where('category', '==', categoryId))
    : productsCollection

  const snapshot = await getDocs(productsQuery)
  return snapshot.docs.map(toProduct)
}

export const getProductById = async (productId) => {
  const snapshot = await getDoc(doc(db, 'products', productId))

  if (!snapshot.exists()) {
    throw Object.assign(new Error('El producto que buscás no existe.'), { code: 'not-found' })
  }

  return toProduct(snapshot)
}
