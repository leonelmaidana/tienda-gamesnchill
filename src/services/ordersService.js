import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

// Crea la orden en Firestore y devuelve el ID generado por Firebase.
export const createOrder = async ({ user, buyer, cart, total }) => {
  const order = {
    userId: user.uid,
    userEmail: user.email,
    buyer,
    items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
    total,
    createdAt: serverTimestamp(),
  }

  const orderRef = await addDoc(collection(db, 'orders'), order)
  return orderRef.id
}
