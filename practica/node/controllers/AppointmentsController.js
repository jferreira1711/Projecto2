import AppointmentsModel from '../models/AppointmentsModel.js'
import Patients from '../models/PatientsModel.js'
import Doctors from '../models/DoctorsModel.js'
import { Op } from "sequelize"; 


//mostrar todos los registros
export const getallAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentsModel.findAll();
        res.json(appointments);
    } catch(error) {
        res.json({ message: "Error in obtaining medical appointments!" });
    }
}



// Obtener citas por DoctorID con estado 'Pending'
export const getAppointmentsByDoctorAndStatus = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const appointments = await AppointmentsModel.findAll({
            where: {
                DoctorID: doctorId, // Filtro por ID del doctor
                Status: 'Pending'  // Filtro por estado
            }
        });

        if (appointments.length === 0) {
            return res.status(404).json({
                message: "There are no medical appointments on your calendar!",
            });
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Error in obtaining medical appointments!",
            error: error.message
        });
    }
};


// Obtener citas por DoctorID con estado 'Pending'
export const getAppointmentsByPatient = async (req, res) => {
    const { patientID } = req.params;

    try {
        const appointments = await AppointmentsModel.findAll({
            where: {
                PatientID: patientID, // Filtro por ID del doctor
            }
        });

        if (appointments.length === 0) {
            return res.status(404).json({
                message: "There are no medical appointments for this patient!",
            });
        }

        res.json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Error in obtaining medical appointments!",
            error: error.message
        });
    }
};

//Mostrar un registro
export const getAppointment = async (req, res) => {
    try {
        const appointment = await AppointmentsModel.findOne({
            where:{ IDAppointment:req.params.id }
        })
        if (!appointment) {
            // Si no se encuentra el paciente, devolver error 404
            return res.status(404).json({ message: "Medical appointment not found!" });
        }

        res.json(appointment)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAppointment = async (req, res) => {
    const { PatientID, DoctorID, AppointmentDate, AppointmentTime, Reason, Status } = req.body;

    try {
        // Verifica si el paciente existe
        const patientExists = await Patients.findByPk(PatientID);
        if (!patientExists) {
            return res.status(404).json({ message: "The patient ID does not exist!" });
        }

        // Verifica si el doctor existe
        const doctorExists = await Doctors.findByPk(DoctorID);
        if (!doctorExists) {
            return res.status(404).json({ message: "The doctor ID does not exist!" });
        }

        // Validar y formatear la fecha
        const formattedDate = new Date(AppointmentDate);
        if (isNaN(formattedDate)) {
            return res.status(400).json({ message: "Invalid date!" });
        }

        // Verificar que no exista una cita duplicada
        const existingAppointment = await AppointmentsModel.findOne({
            where: {
                DoctorID,
                AppointmentDate: formattedDate,
                AppointmentTime
            },
        });

        if (existingAppointment) {
            return res.status(404).json({
                message: "The doctor already has an appointment scheduled for this date and time.",
            });
        }

        // Crea la cita si todas las validaciones pasaron
        const newAppointment = await AppointmentsModel.create(
            {
                PatientID,
                DoctorID,
                AppointmentDate,
                AppointmentTime,
                Reason,
                Status,
            }
        );

        // Responde con el mensaje de éxito y los detalles de la cita creada
        return res.status(201).json({
            message: "Medical appointment created successfully",
            data: newAppointment
        });

    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error in obtaining medical appointments!",
            error: error.message,
        });
    }
};








export const updateAppointment = async (req, res) => {
    const { PatientID, DoctorID, AppointmentDate, AppointmentTime } = req.body;
    try {
        

        // Verifica si el paciente existe
        const patientExists = await Patients.findByPk(PatientID);
        if (!patientExists) {
            return res.status(404).json({ message: "The patient ID does not exist!" });
        }

        // Verifica si el doctor existe
        const doctorExists = await Doctors.findByPk(DoctorID);
        if (!doctorExists) {
            return res.status(404).json({ message: "The doctor ID does not exist!" });
        }

        // Validar y formatear la fecha
        const formattedDate = new Date(AppointmentDate);
        if (isNaN(formattedDate)) {
            return res.status(400).json({ message: "Invalid date!" });
        }

        // Verificar que no exista una cita duplicada
        const existingAppointment = await AppointmentsModel.findOne({
            where: {
                DoctorID,
                AppointmentDate: formattedDate,
                AppointmentTime,
                IDAppointment: { [Op.ne]: req.params.id }, // Excluir la cita actual
            },
        });

        if (existingAppointment) {
            return res.status(404).json({
                message: "The doctor already has an appointment scheduled for this date and time.",
            });
        }
        
        await AppointmentsModel.update(req.body, {
            where: { IDAppointment: req.params.id}
        })
        res.json({
            "message":"Registry updated successfully!"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await AppointmentsModel.destroy({ 
            where: { IDAppointment: req.params.id }
        })
        if (!appointment) {
            // Si no se encuentra el paciente, devolver error 404
            return res.status(404).json({ message: "Medical appointment not found" });
        }
        res.json({
            "message":"Record deleted successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
};
