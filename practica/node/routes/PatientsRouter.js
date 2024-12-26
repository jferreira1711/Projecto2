import express from 'express'
import { createPatient, deletePatient, getallPatients, getPatient, updatePatient } from '../controllers/PatientsController.js'

const routerpatients = express.Router()

routerpatients.get('/',getallPatients)
routerpatients.get('/:id',getPatient)
routerpatients.post('/', createPatient)
routerpatients.put('/:id', updatePatient)
routerpatients.delete('/:id', deletePatient)


export default routerpatients