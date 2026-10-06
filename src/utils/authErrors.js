const authErrorMessages = {
  'auth/invalid-email': 'El email no es válido.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese email.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/user-not-found': 'Email o contraseña incorrectos.',
  'auth/wrong-password': 'Email o contraseña incorrectos.',
  'auth/too-many-requests': 'Demasiados intentos fallidos. Probá de nuevo más tarde.',
  'auth/network-request-failed': 'Error de conexión. Revisá tu internet e intentá de nuevo.',
}

export const getAuthErrorMessage = (code) =>
  authErrorMessages[code] || 'Ocurrió un error inesperado. Intentá nuevamente.'
