//importamos el Modelo
import UsuariosModel from '../models/UsuariosModel.js'
import bcrypt from 'bcrypt'

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getallUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuariosModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.json({ message: "Error getting users" });
    }
};



//Mostrar un registro
export const getUsuario= async (req, res) => {
    try {
        const Usuario = await UsuariosModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(Usuario[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}


//Crear un registro
export const createUsuario = async (req, res) => {
    try {
       await UsuariosModel.create(req.body)
       res.json({
           "message":"Record created successfully!"
       })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Actualizar un registro
export const updateUsuario = async (req, res) => {
    try {
        await UsuariosModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"Registry updated successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


//Eliminar un registro
export const deleteUsuario = async (req, res) => {
    try {
        await UsuariosModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


//verificar si existe el registro 
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca al usuario por nombre de usuario
        const user = await UsuariosModel.findOne({ where: { username } });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Verifica si la contraseña proporcionada coincide con la almacenada
        if (user.password !== password) {
            return res.json({ success: false, message: 'Incorrect password' });
        }

        // Si el usuario es válido y la contraseña coincide
        res.json({ success: true, message: 'Login successful!' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};