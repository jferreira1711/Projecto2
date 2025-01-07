import express from 'express'
import cors from 'cors'


//importamos la conexión a la DB
import db from './database/db.js'

//importamos nuestro enrutador
import UsuariosRouter from './routes/UsuariosRouter.js'
import PatientsRouter from './routes/PatientsRouter.js'
import DoctorsRouter from './routes/DoctorRouter.js'
import MedicalReportsRouter from './routes/MedicalReportsRouter.js'
import AppointmentsRouter from './routes/AppointmentsRouter.js'
import PrescriptionsRouter from './routes/PrescriptionRouter.js'

const app = express()
const port = process.env.PORT || 8001;

// Configuración de CORS
const allowedOrigins = [
    'https://frontend-chp4.vercel.app',  // Dominio configurado en las variables de entorno
    'http://localhost:3000', // Para desarrollo local
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Permitir credenciales
}));
app.use(express.json())
app.use('/usuarios',UsuariosRouter)
app.use('/patients',PatientsRouter)
app.use('/doctors',DoctorsRouter)
app.use('/medicalreports',MedicalReportsRouter)
app.use('/appointments', AppointmentsRouter)
app.use('/prescriptions', PrescriptionsRouter)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.get('/', (req, res)=>{
    res.send('HOLA MUNDO 2.0')
})

app.listen(port, ()=>{
    console.log('Server UP running in http://localhost:8001/')
    
})