import './App.css';
import Navbar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ItemListContainer greeting="Bienvenido a Tienda Games n Chill" />
      <ItemDetailContainer productId="1" />
    </div>

  );
}

export default App
