import { useEffect, useState } from "react";
import ProductoCard from './components/ProductoCard';
import { productosIniciales } from './data/productos'; // Nota: no lo estás usando, evalúa borrarlo si no hace falta
import './App.css';
import BuscadorPokemon from "./components/BuscadorPokemon";
import BuscadorJugador from "./components/BuscadorJugador";
import { obtenerUsuarios, crearUsuario } from "./services/api";

function App() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const disponibles = productos.filter(producto => producto.stock > 0);
  const valorInventario = productos.reduce(
    (total, producto) => total + producto.precio * producto.stock, 0
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
          ? { ...producto, nombre: nombre.trim(), precio: Number(precio), stock: Number(stock) }
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
    const confirmar = window.confirm("¿Seguro que desea eliminar este producto?");
    if (!confirmar) return;
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");


  async function cargarUsuarios() {
    try {
      setLoading(true);
      setError("");
      const datos = await obtenerUsuarios();
      setUsuarios(datos);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  async function guardarUsuario(e) {
    e.preventDefault();

    try {
        await crearUsuario({
            nombre,
            telefono,
            edad: Number(edad)
        });

        setNombreUsuario("");
        setTelefono("");
        setEdad("");

        await cargarUsuarios();

    } catch (e) {
        setError(e.message);
    }
}

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <>
    <h2>Seccion de Productos</h2>
      <form onSubmit={guardarProducto}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
        <button type="submit">
          {editandoId === null ? "Agregar" : "Actualizar"}
        </button>
      </form>

      <main className="contenedor">
        <h1>Tienda tecnológica</h1>
        <p>Productos disponibles: {disponibles.length}</p>
        <p>Existen Productos Agotados?: {productos.some(producto => producto.stock === 0) ? "Si" : "No"}</p>
        <p>Valor del inventario: ${valorInventario}</p>

        <section className="productos">
          <h2>Todos los Productos</h2>
          {productos.map((producto) => (
            <article key={producto.id} className="producto-item">
              <ProductoCard producto={producto} />
              <div className="acciones">
                <button onClick={() => editarProducto(producto)}>Editar</button>
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </div>
            </article>
          ))}
        </section>

        <section className='productos'>
          <h2>Solo Disponibles</h2>
          {disponibles.map(producto => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </section>
        
        <h2>Seccion de Buscadores</h2>
        <BuscadorPokemon />
        <BuscadorJugador />


        <h2>Seccion de Usuarios</h2>
        <section className="usuarios-seccion">
          <h2>Usuarios registrados</h2>
          {loading && <p>Consultando información de usuarios...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!loading && !error && usuarios.length === 0 && <p>No hay registros.</p>}
          {!loading && !error && usuarios.map((usuario) => (
            <article key={usuario.id}>
              <h2>{usuario.nombre}</h2>
              <p>Teléfono: {usuario.telefono}</p>
              <p>Edad: {usuario.edad}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
