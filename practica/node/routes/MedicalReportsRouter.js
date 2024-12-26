import express from 'express'
import { createMedicalreport, deleteMedicalreport, getallMedicalreports, getLastMedicalreport, getMedicalreport, getReportsByPatient, updateMedicalreport } from '../controllers/MedicalReportsController.js'

const Medicalreports = express.Router()

Medicalreports.get('/',getallMedicalreports)
Medicalreports.get('/:id', getMedicalreport)
Medicalreports.post('/', createMedicalreport)
Medicalreports.put('/:id', updateMedicalreport)
Medicalreports.delete('/:id', deleteMedicalreport)
Medicalreports.get('/last/report', getLastMedicalreport)
Medicalreports.get('/patient/:patientID', getReportsByPatient)


export default Medicalreports