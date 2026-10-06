import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuthErrorMessage } from '../../utils/authErrors'
import './AuthForm.css'

const AuthForm = ({
  title,
  submitLabel,
  onSubmit,
  requireConfirm = false,
  footerText,
  footerLinkTo,
  footerLinkLabel,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Completá el email y la contraseña.')
      return
    }

    if (requireConfirm && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setSubmitting(true)

    try {
      await onSubmit(email.trim(), password)
    } catch (err) {
      setError(getAuthErrorMessage(err.code))
      setSubmitting(false)
    }
  }

  return (
    <main className="auth">
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <h1 className="auth__title">{title}</h1>

        <label className="auth__label">
          Email
          <input
            className="auth__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>

        <label className="auth__label">
          Contraseña
          <input
            className="auth__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={requireConfirm ? 'new-password' : 'current-password'}
          />
        </label>

        {requireConfirm && (
          <label className="auth__label">
            Repetir contraseña
            <input
              className="auth__input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </label>
        )}

        {error && (
          <p className="auth__error" role="alert">
            {error}
          </p>
        )}

        <button className="auth__submit" type="submit" disabled={submitting}>
          {submitting ? 'Procesando...' : submitLabel}
        </button>

        <p className="auth__footer">
          {footerText} <Link to={footerLinkTo}>{footerLinkLabel}</Link>
        </p>
      </form>
    </main>
  )
}

export default AuthForm
