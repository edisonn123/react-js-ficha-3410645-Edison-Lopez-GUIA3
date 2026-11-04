import { useEffect, useState } from "react";
import ProductoCard from './components/ProductoCard'; 
import { productosIniciales } from './data/productos';
import './App.css';
import BuscadorPokemon from "./components/BuscadorPokemon";
import BuscadorJugador from "./components/BuscadorJugador";

function App() {
  const [productos, setProductos] = useState(() => {
  const guardados = localStorage.getItem("productos");

  return guardados ? JSON.parse(guardados) : [];
});
useEffect(() => {
  localStorage.setItem(
    "productos",
    JSON.stringify(productos)
  );
}, [productos]);

  const disponibles = productos.filter(producto => producto.stock > 0); 
  const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * producto.stock, 
    0
  );
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const guardarProducto = (e) => {
  e.preventDefault();
  if (nombre.trim() === "" || precio === "" || stock === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (Number(precio) <= 0 || Number(stock) < 0) {
    alert("Revise precio y stock");
    return;
  }

  if (editandoId === null) {
    const nuevoProducto = {
      id: Date.now(),
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock)
    };

    setProductos([...productos, nuevoProducto]);
  } else {
    const actualizados = productos.map((producto) =>
      producto.id === editandoId
        ? {
            ...producto,
            nombre: nombre.trim(),
            precio: Number(precio),
            stock: Number(stock)
          }
        : producto
    );

    setProductos(actualizados);
    setEditandoId(null);
  }

  setNombre("");
  setPrecio("");
  setStock("");
};
const editarProducto = (producto) => {
  setEditandoId(producto.id);
  setNombre(producto.nombre);
  setPrecio(producto.precio);
  setStock(producto.stock);
};
const eliminarProducto = (id) => {
  const confirmar = window.confirm(
    "¿Seguro que desea eliminar este producto?"
  );

  if (!confirmar) return;

  setProductos(
    productos.filter((producto) => producto.id !== id)
  );
};
return (
  <>
  <form onSubmit={guardarProducto}>
    <input
      type="text"
      placeholder="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
    />

    <input
      type="number"
      placeholder="Precio"
      value={precio}
      onChange={(e) => setPrecio(e.target.value)}
    />

    <input
      type="number"
      placeholder="Stock"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
    />

    <button type="submit">
      {editandoId === null ? "Agregar" : "Actualizar"}
    </button>
  </form>
  <main className="contenedor">
    <h1>Tienda tecnológica</h1>
    <p>Productos disponibles: {disponibles.length}</p>
    <p>Existen Productos Agotados?: {productos.some(producto => producto.stock === 0) ? "Si" : "No"}`</p>
    <p>Valor del inventario: ${valorInventario}</p>
    <section className="productos">
      <h2>Todos los Productos</h2>
      {productos.map(producto => (
        <ProductoCard 
          key={producto.id} 
          producto={producto}
        />
      ))}
    </section>
    <section className='productos'>
      <h2>Productos Disponibles</h2>
      {productos.filter(producto => producto.stock > 0).map(producto => (
        <ProductoCard
        key={producto.id}
        producto={producto}
        />
      ))}
    </section>
    <section>
  {productos.map((producto) => (
    <article key={producto.id}>
      <h3>{producto.nombre}</h3>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>

      <button onClick={() => editarProducto(producto)}>
        Editar
      </button>

      <button onClick={() => eliminarProducto(producto.id)}>
        Eliminar
      </button>
    </article>
  ))}
</section>
<BuscadorPokemon />
<BuscadorJugador />
  </main>
  </>
  );
}

export default App;
