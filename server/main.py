from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configura la conexión a MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/cansat"
mongo = PyMongo(app)

# Ruta para obtener todos los elementos
@app.route('/api/get', methods=['GET'])
def get_data():
    collection = mongo.db.datos
    data = collection.find_one(sort=[("createdAt", -1)])
    result = []
    result.append({
        'latitud': data['latitud'],
        'longitud': data['longitud'],
        'co': data['co'],
        'alcohol': data['alcohol'],
        'co2': data['co2'],
        'toluen': data['toluen'],
        'nh4': data['nh4'],
        'acetona': data['acetona'],
        'a_x': data['a_x'],
        'a_y': data['a_y'],
        'a_z': data['a_z'],
        'g_x': data['g_x'],
        'g_y': data['g_y'],
        'g_z': data['g_z'],
        'm_x': data['m_x'],
        'm_y': data['m_y'],
        'm_z': data['m_z'],
        'yaw': data['yaw'],
        'pitch': data['pitch'],
        'roll': data['roll'],
        'temperatura': data['temperatura'],
        'presion': data['presion'],
        'altura': data['altura'],
        'mp25': data['mp25'],
        'mp10': data['mp10']
    })
    return jsonify(result)

@app.route('/api/store', methods=['POST'])
def add_data():
    data=request.form
    new_data = {
        'latitud': data['a'],
        'longitud': data['b'],
        'co': data['c'],
        'alcohol': data['d'],
        'co2': data['e'],
        'toluen': data['f'],
        'nh4': data['g'],
        'acetona': data['h'],
        'a_x': data['i'],
        'a_y': data['j'],
        'a_z': data['k'],
        'g_x': data['l'],
        'g_y': data['m'],
        'g_z': data['n'],
        'm_x': data['o'],
        'm_y': data['p'],
        'm_z': data['q'],
        'yaw': data['r'],
        'pitch': data['s'],
        'roll': data['t'],
        'temperatura': data['u'],
        'presion': data['v'],
        'altura': data['w'],
        'mp25': data['x'],
        'mp10': data['y'],
        'createdAt': datetime.now(),
    }
    mongo.db.datos.insert_one(new_data)
    
    return jsonify({'message': 'Dato agregado exitosamente'})

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")