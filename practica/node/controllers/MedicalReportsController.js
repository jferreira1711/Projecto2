
import MedicalReportsModel from "../models/MedicalReportsModel.js";
import Patients from '../models/PatientsModel.js';
import Doctors from '../models/DoctorsModel.js';

//Mostrar todos los registros
export const getallMedicalreports = async (req, res) => {
    try {
        const medicalreports = await MedicalReportsModel.findAll();
        res.json(medicalreports);
    } catch (error) {
        res.json({ message: "Error obtaining medical reports!" });
    }
};

//Mostrar un registro
export const getMedicalreport = async (req, res) => {
    try {
        const medicalreport = await MedicalReportsModel.findAll({
            where:{ ReportID:req.params.id }
        })
        if (!medicalreport) {
            // Si no se encuentra el paciente, devolver error 404
            return res.status(404).json({ message: "Medical report not found!" });
        }
        res.json(medicalreport[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// Obtener citas por DoctorID con estado 'Pending'
export const getReportsByPatient = async (req, res) => {
    const { patientID } = req.params;

    try {
        const medicalReports = await MedicalReportsModel.findAll({
            where: {
                PatientID: patientID, // Filtro por ID del doctor
            }
        });

        if (medicalReports.length === 0) {
            return res.status(404).json({
                message: "This patient has no medical reports!",
            });
        }

        res.json(medicalReports);
    } catch (error) {
        res.status(500).json({
            message: "Error obtaining medical reports!",
            error: error.message
        });
    }
};

export const createMedicalreport = async (req, res) => {
    const { PatientID, DoctorID, ReportDate, Diagnosis, Treatment, Notes } = req.body;

    try {
        // Verifica si el paciente existe
        const patientExists = await Patients.findByPk(PatientID);
        if (!patientExists) {
            return res.status(404).json({ message: "Patient ID does not exist!" });
        }

        // Verifica si el doctor existe
        const doctorExists = await Doctors.findByPk(DoctorID);
        if (!doctorExists) {
            return res.status(404).json({ message: "Doctor ID does not exist!" });
        }
        // Crea el reporte médico si los IDs son válidos
        const newMedicalReport = await MedicalReportsModel.create({
            PatientID,
            DoctorID,
            ReportDate,
            Diagnosis,
            Treatment,
            Notes,
        });

        return res.status(200).json({ message: "Medical report created successfully!", data: newMedicalReport });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating medical report!", error });
    }
};

//Actualizar un registro
export const updateMedicalreport = async (req, res) => {
    try {
        await MedicalReportsModel.update(req.body, {
            where: { ReportID: req.params.id}
        })
        res.json({
            "message":"Registry updated successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Eliminar un registro
export const deleteMedicalreport = async (req, res) => {
    try {
        await MedicalReportsModel.destroy({ 
            where: { ReportID: req.params.id }
        })
        res.json({
            "message":"Record deleted successfully!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// Mostrar el último registro
export const getLastMedicalreport = async (req, res) => {
    try {
        const lastMedicalReport = await MedicalReportsModel.findOne({
            order: [['ReportID', 'DESC']] // Ordenar por ReportID en orden descendente
        });
        
        if (!lastMedicalReport) {
            return res.status(404).json({ message: "No medical report was found!" });
        }

        res.json(lastMedicalReport);
    } catch (error) {
        res.status(500).json({ message: "Error getting the latest medical report!", error });
    }
};
