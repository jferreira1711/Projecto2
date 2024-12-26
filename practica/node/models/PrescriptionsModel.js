import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize'
import Appointments from './AppointmentsModel.js';

const Prescription = db.define('prescriptions',{
    PrescriptionID: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true // Genera automáticamente el ID
    },
    MedicalReportID: {
        type: DataTypes.INTEGER, 
        allowNull: false, // Campo obligatorio
        references: {
            model: Appointments, // Relación con la tabla Patients
            key: 'id'
        },
        onDelete: 'CASCADE' // Elimina las citas si el paciente es eliminado
    },
    Medication: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    Dosage: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    Duration: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    Instructions: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    Guidelines: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    PrescriptionWithdrawn: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false // Por defecto, los pacientes están activos
    }
})

export default Prescription