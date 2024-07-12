#--------------------------------------------------------------------
# Instalar con pip install Flask
from flask import Flask, request, jsonify

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
import mysql.connector.errorcode

from werkzeug.utils import secure_filename
import os
import time
import datosconexion as bd

#--------------------------------------------------------------------

app = Flask(__name__)
CORS(app)  # Esto habilitará CORS para todas las rutas

class Catalogo:
    #----------------------------------------------------------------
    # Constructor de la clase
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        self.cursor = self.conn.cursor()
        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err

        self.cursor.execute('''CREATE TABLE IF NOT EXISTS gatitos
                            (id_gatito INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
                            nombre VARCHAR(50) NOT NULL ,
                            descripcion VARCHAR(255) NOT NULL ,
                            imagen VARCHAR(255) NOT NULL)''')
        self.conn.commit()

        # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)
        
    def conectar(self):
        try:
            self.conn = mysql.connector.connect(
                host=bd.host,
                user=bd.user,
                password=bd.password,
                database=bd.database
            )
            self.cursor = self.conn.cursor(dictionary=True)
            return "OK"
        except:
            return "ERROR"
    
    def desconectar(self):
        try:
            self.cursor.close()
            self.conn.close()
            return "OK"
        except:
            return "ERROR"

    def listar_gatitos(self):
        self.conectar()
        self.cursor.execute("SELECT * FROM gatitos")
        gatitos = self.cursor.fetchall()
        self.desconectar()
        return gatitos

    def consultar_gatito(self, id_gatito):
        self.conectar()
        self.cursor.execute(f"SELECT * FROM gatitos WHERE id_gatito = {id_gatito}")
        self.desconectar()
        return self.cursor.fetchone()

    def mostrar_gatito(self, id_gatito):
        self.conectar()
        gatito = self.consultar_gatito(id_gatito)
        if gatito:
            print("-" * 40)
            print(f"id_gatito.....: {gatito['id_gatito']}")
            print(f"Nombre...: {gatito['nombre']}")
            print(f"Descripción: {gatito['descripcion']}")
            print(f"Imagen.....: {gatito['imagen']}")
            print("-" * 40)
        else:
            print("Gatito no encontrado.")
        self.desconectar()

    def agregar_gatito(self,nombre,descripcion,imagen):
        self.conectar()
        sql = "INSERT INTO gatitos (nombre, descripcion, imagen) VALUES (%s, %s, %s)"
        valores = (nombre,descripcion,imagen)
        self.cursor.execute(sql,valores)
        self.conn.commit()
        self.desconectar()
        return self.cursor.lastrowid

    def modificar_gatito(self, id_gatito, nueva_nombre, nueva_descripcion, nueva_imagen):
        self.conectar()
        sql = "UPDATE gatitos SET nombre = %s, descripcion = %s,  imagen = %s WHERE id_gatito = %s"
        valores = (nueva_nombre,nueva_descripcion,nueva_imagen, id_gatito)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        self.desconectar()
        return self.cursor.rowcount > 0

    def eliminar_gatito(self, id_gatito):
        self.conectar()
        self.cursor.execute(f"DELETE FROM gatitos WHERE id_gatito = {id_gatito}")
        self.conn.commit()
        self.desconectar()
        return self.cursor.rowcount > 0

#--------------------------------------------------------------------
# Cuerpo del programa
#--------------------------------------------------------------------
# Crear una instancia de la clase Catalogo
catalogo = Catalogo(host=bd.host,user=bd.user,password=bd.password,database=bd.database)

ruta_destino = '/home/saporapo/mysite/static/imagenes/'

@app.route("/gatitos", methods=["GET"])
def listar_gatitos():
    gatitos = catalogo.listar_gatitos()
    return jsonify(gatitos)

@app.route("/gatitos/<int:id_gatito>", methods=["GET"])
def mostrar_gatito(id_gatito):
    gatito = catalogo.consultar_gatito(id_gatito)
    if gatito:
        return jsonify(gatito)
    else:
        return "Gatito no encontrado", 404

@app.route("/gatitos", methods=["POST"])
def agregar_gatito():
    #Recojo los datos del form
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    imagen = request.files['imagen']
    nombre_imagen = ""
    # Genero el nombre de la imagen
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    nuevo_codigo = catalogo.agregar_gatito(nombre,descripcion,nombre_imagen)
    if nuevo_codigo:
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje": "Gatito agregado correctamente.", "id_gatito": nuevo_codigo, "imagen": nombre_imagen}), 201
    else:
        return jsonify({"mensaje": "Error al agregar gatito."}), 500

@app.route("/gatitos/<int:id_gatito>", methods=["PUT"])
def modificar_gatito(id_gatito):
    #Se recuperan los nuevos datos del formulario
    nueva_nombre = request.form.get("nombre")
    nueva_descripcion = request.form.get("descripcion")
# Se llama al método modificar_producto pasando el codigo del producto y los nuevos datos.
    if 'imagen' in request.files:
            imagen = request.files['imagen']
            # Procesamiento de la imagen
            nombre_imagen = secure_filename(imagen.filename)
            nombre_base, extension = os.path.splitext(nombre_imagen)
            nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
            # Guardar la imagen en el servidor
            imagen.save(os.path.join(ruta_destino, nombre_imagen))
            #imagen.save(os.path.join('https://saporapo.pythonanywhere.com/static/imagenes/', nombre_imagen))
            # Busco el producto guardado
            gatito = catalogo.consultar_gatito(id_gatito)
            if gatito: # Si existe el producto...
                imagen_vieja = gatito["imagen"]
                # Armo la ruta a la imagen
                ruta_imagen = os.path.join(ruta_destino, imagen_vieja)
                # Y si existe la borro.
                if os.path.exists(ruta_imagen):
                    os.remove(ruta_imagen)
    else:
        gatito = catalogo.consultar_gatito(id_gatito)
        if gatito:
            nombre_imagen = gatito["imagen"]
    if catalogo.modificar_gatito(id_gatito, nueva_nombre, nueva_descripcion,nombre_imagen):
        return jsonify({"mensaje": "Gatito modificado"}), 200
    else:
        return jsonify({"mensaje": "Gatito no encontrado"}), 403

@app.route("/gatitos/<int:id_gatito>", methods=["DELETE"])
def eliminar_gatito(id_gatito):
    # Luego, elimina el producto del catálogo
    gatito = catalogo.consultar_gatito(id_gatito)
    if gatito:
        # Eliminar la imagen asociada si existe
        ruta_imagen = os.path.join(ruta_destino, gatito['imagen'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        # Luego, elimina el producto del catálogo
        if catalogo.eliminar_gatito(id_gatito):
            return jsonify({"mensaje": "Gatito eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar Gatito"}), 500


if __name__ == "__main__":
    app.run(debug=True)