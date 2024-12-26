import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize'


const doctors = db.define('doctors',{
    DoctorID: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true // Genera automáticamente el ID
    },
    FirstName: { 
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    LastName: { 
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    Specialty: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    PhoneNumber: { 
        type: DataTypes.STRING, // Teléfono opcional
        allowNull: true // Campo obligatorio
    },
    Email: { 
        type: DataTypes.STRING, 
        allowNull: true // Campo obligatorio
    },
    LicenseNumber: {
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    }


})

export default doctors 