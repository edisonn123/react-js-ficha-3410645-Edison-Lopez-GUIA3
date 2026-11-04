const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export async function obtenerUsuarios() {
    const respuesta = await fetch(
        `${API_URL}/api/usuarios`
    );

    if (!respuesta.ok) {
        throw new Error(
            "No fue posible consultar los usuarios"
        );
    }

    return respuesta.json();
}

export async function crearUsuario(usuario) {
    const respuesta = await fetch(
        `${API_URL}/api/usuarios`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            datos.mensaje ||
            "No fue posible crear el usuario"
        );
    }

    return datos;
}
