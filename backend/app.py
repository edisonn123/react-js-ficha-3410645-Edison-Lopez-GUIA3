from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

@app.get("/api/usuarios")
def listar_usuarios():
    conexion = get_connection()
    cursor = conexion.cursor(dictionary=True)

    cursor.execute("SELECT * FROM usuarios ORDER BY id DESC")
    datos = cursor.fetchall()

    cursor.close()
    conexion.close()

    return jsonify(datos), 200


@app.post("/api/usuarios")
def crear_usuario():
    datos = request.get_json()

    if not datos:
        return jsonify({
            "mensaje": "No se recibieron datos"
        }), 400

    nombre = datos.get("nombre", "").strip()
    telefono = datos.get("telefono", "").strip()
    edad = datos.get("edad")

    if not nombre or telefono is None:
        return jsonify({
            "mensaje": "Nombre y telefono son obligatorios"
        }), 400

    conexion = get_connection()
    cursor = conexion.cursor()

    sql = '''
        INSERT INTO usuarios (nombre, telefono, edad)
        VALUES (%s, %s, %s)
    '''

    cursor.execute(sql, (nombre, telefono, edad))
    conexion.commit()

    nuevo_id = cursor.lastrowid

    cursor.close()
    conexion.close()

    return jsonify({
        "mensaje": "Usuario creado",
        "id": nuevo_id
    }), 201


if __name__ == "__main__":
    app.run(debug=True)
