//importamos el Modelo
import PatientsModel from '../models/PatientsModel.js'
import AppointmentsModel from '../models/AppointmentsModel.js';
import bcrypt from 'bcrypt'

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getallPatients = async (req, res) => {
    try {
        const patients = await PatientsModel.findAll();
        res.json(patients);
    } catch (error) {
        res.json({ message: "Error getting patients!" });
    }
};

//Mostrar un registro
// Mostrar un registro
export const getPatient = async (req, res) => {
    try {
        const patient = await PatientsModel.findOne({
            where: { id: req.params.id }
        });

        if (!patient) {
            // Si no se encuentra el paciente, devolver error 404
            return res.status(404).json({ message: "Patient ID not found" });
        }

        res.json(patient); // Enviar el paciente si se encuentra
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//Crear un registro
export const createPatient = async (req, res) => {
    try {
       await PatientsModel.create(req.body)
       res.json({
           "message":"Record created successfully!"
       })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


//Actualizar un registro
export const updatePatient = async (req, res) => {
    try {
        await PatientsModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"Registry updated successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

export const deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        // Eliminar todas las citas asociadas al paciente
        const deletedAppointments = await AppointmentsModel.destroy({
            where: { PatientID: id }
        });

        // Luego, eliminar al paciente
        const deletedPatient = await PatientsModel.destroy({
            where: { id }
        });

        if (!deletedPatient) {
            // Si no se encuentra el paciente, devolver error 404
            return res.status(404).json({ message: "Patient ID not found" });
        }

        res.json({
            message: "¡Patient and his appointments deleted successfully!",
            deletedAppointmentsCount: deletedAppointments, // Opcional, para mostrar cuántas citas se eliminaron
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting patient and appointments",
            error: error.message,
        });
    }
};
