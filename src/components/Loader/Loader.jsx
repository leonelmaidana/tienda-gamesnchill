import './Loader.css'

const Loader = ({ message = 'Cargando...' }) => {
  return (
    <div className="loader" role="status">
      <span className="loader__spinner" />
      <p className="loader__message">{message}</p>
    </div>
  )
}

export default Loader
