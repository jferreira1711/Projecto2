import express from 'express'
import { createPrescription, getallPrescriptions, getPrescription, getPrescriptionsByIdPatient } from '../controllers/PrescriptionsController.js'

const Prescriptions = express.Router()

Prescriptions.get('/',getallPrescriptions)
Prescriptions.get('/byId/:id',getPrescription)
Prescriptions.get('/:patientId', getPrescriptionsByIdPatient)
Prescriptions.post('/', createPrescription)

export default Prescriptions