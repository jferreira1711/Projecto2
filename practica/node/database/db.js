import {Sequelize} from 'sequelize'

const db = new Sequelize(
    process.env.DB || 'hospital_app',
    process.env.USERDB || 'root',
    process.env.PASSWORDDB || '',
    {
        host: process.env.HOSTDB || 'localhost',
        port: process.env.PORTDB || 3306, // Cambiado a 3306
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
);




export default db