//importamos el Modelo
import DoctorsModel from '../models/DoctorsModel.js'



//Mostrar todos los registros
export const getallDoctors = async (req, res) => {
    try {
        const doctors = await DoctorsModel.findAll();
        res.json(doctors);
    }catch (error) {
        res.json({message: "Error in obtaining doctors!"})
    }
}

//Mostrar un registro
export const getDoctor = async (req, res) => {
    try {
        const doctor = await DoctorsModel.findOne({
            where: { DoctorID: req.params.id }
        });

        if (!doctor) {
            // Si no se encuentra el paciente, devolver error 404
            return res.status(404).json({ message: "Doctor id not found" });
        }

        res.json(doctor); // Enviar el paciente si se encuentra
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Crear un registro
export const createDoctor = async (req, res) =>{
    try {
        await DoctorsModel.create(req.body)
        res.json({
            "message":"Record created successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Actualizar un registro
export const updateDoctor = async (req, res) => {
    try {
        await DoctorsModel.update(req.body, {
            where: { DoctorID: req.params.id}
        })
        res.json({
            "message":"Registry updated successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


//Eliminar un registro
export const deleteDoctor = async (req, res) => {
    try {
        await DoctorsModel.destroy({ 
            where: { DoctorID: req.params.id }
        })
        res.json({
            "message":"Record deleted successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}