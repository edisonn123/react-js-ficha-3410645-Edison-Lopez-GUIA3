// EN ESTE COMPONENTE SE USO LA IA PARA CREARLO
// Todas las reglas de la auditoria esta realizada y esta correcta 
import { useState } from "react";

function BuscadorJugador() {
  const [busqueda, setBusqueda] = useState("");
  const [jugador, setJugador] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const buscarJugador = async (e) => {
    e.preventDefault();

    const nombre = busqueda.trim();

    if (!nombre) {
      setJugador(null);
      setError("Escribe el nombre de un futbolista.");
      return;
    }

    try {
      setCargando(true);
      setError("");
      setJugador(null);

      const respuesta = await fetch(
        `https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${encodeURIComponent(nombre)}`
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo consultar la API.");
      }

      const datos = await respuesta.json();

      const jugadores = (datos.player || []).filter(
        (persona) =>
          persona.strSport?.toLowerCase() === "soccer"
      );

      const resultado = jugadores.find(
        (persona) =>
          persona.strPlayer?.trim().toLowerCase() ===
          nombre.toLowerCase()
      );

      if (!resultado) {
        setError("No se encontró un futbolista con ese nombre exacto.");
        return;
      }

      setJugador(resultado);
    } catch {
      setError("Ocurrió un error al consultar los jugadores.");
    } finally {
      setCargando(false);
    }
  };

  const imagen =
    jugador?.strCutout ||
    jugador?.strThumb ||
    jugador?.strRender;

  return (
    <section className="buscador-jugador">
      <h2>Buscar futbolista</h2>

      <form onSubmit={buscarJugador}>
        <input
          type="text"
          placeholder="Ej. Lionel Messi"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Buscando..." : "Buscar jugador"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

      {jugador && (
        <article className="tarjeta-jugador">
          {imagen ? (
            <img
              src={imagen}
              alt={jugador.strPlayer}
              width="220"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <p>Este jugador no tiene imagen disponible.</p>
          )}

          <h3>{jugador.strPlayer}</h3>
        </article>
      )}
    </section>
  );
}

export default BuscadorJugador;
