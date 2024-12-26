import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize'
import Patients from './PatientsModel.js'; // Importa el modelo de Patients
import Doctors from './DoctorsModel.js';  // Importa el modelo de Doctors

const medicalreports = db.define('medicalreports',{
    ReportID: { 
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
        onDelete: 'CASCADE' // Elimina informes si el paciente es eliminado
    },
    DoctorID: { 
        type: DataTypes.INTEGER, 
        allowNull: false, // Campo obligatorio
        references: {
            model: Doctors, // Relación con la tabla Doctors
            key: 'id'
        },
        onDelete: 'CASCADE' // Elimina informes si el médico es eliminado
    },
    ReportDate: { 
        type: DataTypes.DATE, 
        allowNull: false // Fecha del informe es obligatoria
    },
    Diagnosis: { 
        type: DataTypes.TEXT, 
        allowNull: false // Diagnóstico obligatorio
    },
    Treatment: { 
        type: DataTypes.TEXT, 
        allowNull: false // Tratamiento opcional
    },
    Notes: { 
        type: DataTypes.TEXT, 
        allowNull: true // Notas adicionales opcionales
    }
})

export default medicalreports