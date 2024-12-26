import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize'
import Patients from './PatientsModel.js'; // Importa el modelo de Patients
import Doctors from './DoctorsModel.js';  // Importa el modelo de Doctors

const Appointments = db.define('appointments',{
    IDAppointment: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true // Genera automáticamente el ID
    },
    PatientID: {
        type: DataTypes.INTEGER, 
        allowNull: false, // Campo obligatorio
        references: {
            model: Patients, // Relación con la tabla Patients
            key: 'id'
        },
        onDelete: 'CASCADE' // Elimina las citas si el paciente es eliminado
    },
    DoctorID : {
        type: DataTypes.INTEGER, 
        allowNull: false, // Campo obligatorio
        references: {
            model: Doctors, // Relación con la tabla Doctors
            key: 'id'
        },
        onDelete: 'CASCADE' // Elimina informes si el médico es eliminado
    },
    AppointmentDate : {
        type: DataTypes.DATE, 
        allowNull: false // Fecha de la cita es obligatoria
    },
    AppointmentTime : {
        type: DataTypes.TIME, 
        allowNull: false // Hora de la cita es obligatoria
    },
    Reason : {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    Status: { 
        type: DataTypes.ENUM('Pending', 'Canceled', 'Completed'), 
        allowNull: false, // Estado obligatorio
    }
})

export default Appointments