import db from '../database/db.js';
//importamos sequelize
import { DataTypes } from 'sequelize'

const patients = db.define('patients',{
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true // Genera automáticamente el ID
    },
    firstName: { 
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    lastName: { 
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    gender: { 
        type: DataTypes.ENUM('Male', 'Feminine'), // Define los valores permitidos
        allowNull: false, // Campo obligatorio
    },
    age: { 
        type: DataTypes.INTEGER,
        allowNull: true
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false // Campo obligatorio
    },
    address: { 
        type: DataTypes.STRING, // Dirección opcional
        allowNull: true
    },
    phone: { 
        type: DataTypes.STRING, // Teléfono opcional
        allowNull: false // Campo obligatorio
    },
    insurance_number: { 
        type: DataTypes.STRING,
        allowNull: false // Campo obligatorio
    },
    height: { 
        type: DataTypes.DECIMAL(5, 2), // Permite valores decimales con 2 decimales (ejemplo: 1.75)
        allowNull: false // Campo obligatorio
    },
    weight: { 
        type: DataTypes.DECIMAL(5, 2), // Similar a altura
        allowNull: false // Campo obligatorio
    },
    birthDate: { 
        type: DataTypes.DATE, 
        allowNull: false // Campo obligatorio
    },
    active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true // Por defecto, los pacientes están activos
    },
    bloodType: { 
        type: DataTypes.ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'), // Define los valores permitidos
        allowNull: false, // Campo obligatorio
    },
    
})

export default patients