import express from 'express'
import { createAppointment, deleteAppointment, getallAppointments, getAppointment, getAppointmentsByDoctorAndStatus, getAppointmentsByPatient, updateAppointment } from '../controllers/AppointmentsController.js'


const Appointments = express.Router()

Appointments.get('/', getallAppointments)
Appointments.get('/:id', getAppointment)
Appointments.post('/', createAppointment)
Appointments.put('/:id', updateAppointment)
Appointments.delete('/:id', deleteAppointment)
Appointments.get('/doctor/:doctorId/pending', getAppointmentsByDoctorAndStatus)
Appointments.get('/patient/:patientID', getAppointmentsByPatient)

export default Appointments
