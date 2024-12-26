import {Sequelize} from 'sequelize'

const db = new Sequelize('hospital_app', 'root', '',{
    host:'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }

})

export default db