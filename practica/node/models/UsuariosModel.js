//importamos la conexión a la DB
import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize'

const UsuariosModel = db.define('usuarios',{
    id: { type: DataTypes.INTEGER, primaryKey: true},
    username: { type: DataTypes.STRING},
    password: { type: DataTypes.STRING},
    email: {type: DataTypes.STRING}

})
export default UsuariosModel