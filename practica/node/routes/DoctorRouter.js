import express from 'express'
import { createDoctor, deleteDoctor, getallDoctors, getDoctor, updateDoctor } from '../controllers/DoctorsController.js'


const routerDoctors = express.Router()

routerDoctors.get('/', getallDoctors)
routerDoctors.get('/:id', getDoctor)
routerDoctors.post('/', createDoctor)
routerDoctors.put('/:id', updateDoctor)
routerDoctors.delete('/:id', deleteDoctor)

export default routerDoctors