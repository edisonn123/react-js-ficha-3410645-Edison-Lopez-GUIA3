import { useState } from "react";

export default function BuscadorPokemon() {
  const [busqueda, setBusqueda] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const buscarPokemon = async (e) => {
    e.preventDefault();

    const nombre = busqueda.toLowerCase().trim();

    if (nombre === "") {
      setError("Escriba un nombre o ID");
      return;
    }

    try {
      setCargando(true);
      setError("");
      setPokemon(null);

      const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      );

      if (!respuesta.ok) {
        throw new Error("Pokémon no encontrado");
      }

      const datos = await respuesta.json();

      setPokemon(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section>
      <h2>Mini PokéAPI</h2>
      <form onSubmit={buscarPokemon}>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="pikachu o 25"
        />
        <button type="submit">Buscar</button>
      </form>

      {cargando && <p>Consultando...</p>}
      {error && <p>{error}</p>}

      {pokemon && (
        <article>
          <h3>{pokemon.name}</h3>
          <p>ID: {pokemon.id}</p>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </article>
      )}
    </section>
  );
}
