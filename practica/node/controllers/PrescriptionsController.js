import PrescriptionsModel from '../models/PrescriptionsModel.js'

import MedicalReportsModel from '../models/MedicalReportsModel.js'

export const getallPrescriptions = async (req, res) => {
    try {
        const prescriptions = await PrescriptionsModel.findAll();
        res.json(prescriptions);
    } catch(error) {
        res.json({ message: "Error in obtaining medical prescriptions!" });
    }
}

//Mostrar un registro
export const getPrescription = async (req, res) => {
    try {
        const prescription = await PrescriptionsModel.findAll({
            where: { PrescriptionID: req.params.id }
        });

        if (prescription.length === 0) {
            // Si no se encuentra la receta, devolver error 404
            return res.status(404).json({ message: "Prescription ID not found!" });
        }

        res.json(prescription[0]); // Devolver el primer resultado encontrado
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const getPrescriptionsByIdPatient = async (req, res) => {
    const { patientId } = req.params; // Obtiene el ID del paciente desde los parámetros de la solicitud

    try {
        // Paso 1: Busca los reportes médicos asociados al PatientID
        const medicalReports = await MedicalReportsModel.findAll({
            where: { PatientID: patientId },
        });

        // Verifica si hay reportes médicos
        if (medicalReports.length === 0) {
            return res.status(404).json({ message: "No medical reports found for this patient!" });
        }

        // Paso 2: Extrae los IDs de los reportes médicos
        const reportIds = medicalReports.map((report) => report.ReportID);

        // Log para verificar los IDs de los reportes médicos
        console.log("IDs de reportes médicos:", reportIds);

        // Paso 3: Busca las recetas médicas asociadas a los reportes médicos
        const prescriptions = await PrescriptionsModel.findAll({
            where: { MedicalReportID: reportIds },
        });

        // Verifica si hay recetas médicas
        if (prescriptions.length === 0) {
            return res.status(404).json({ message: "No prescriptions were found for this patient!" });
        }

        // Responde con las recetas médicas encontradas
        res.json(prescriptions);

    } catch (error) {
        console.error("Error in obtaining medical prescriptions:", error);
        res.status(500).json({ message: "Error in obtaining medical prescriptions!" });
    }
};


export const createPrescription = async (req, res) => {
    const {MedicalReportID, Medication, Dosage, Duration, Instructions, Guidelines} = req.body;

    try{
        const medicalReportExist = await MedicalReportsModel.findByPk(MedicalReportID);

        if (!medicalReportExist){
            return res.status(404).json({ message: "The medical report ID does not exist!" });
        }

        // Verificar si ya existe una receta para este reporte médico
        const existingPrescription = await PrescriptionsModel.findOne({
            where: { MedicalReportID },
        });

        if (existingPrescription) {
            return res.status(400).json({
                message: "There is already a prescription for this medical report. No more prescriptions can be added!",
            });
        }
        const newPrescription = await PrescriptionsModel.create({
            MedicalReportID,
            Medication,
            Dosage,
            Duration,
            Instructions,
            Guidelines
        }) 

        // Responde con el mensaje de éxito y los detalles de la cita creada
        return res.status(201).json({
            message: "Medical prescription created successfully!",
            data: newPrescription
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creating medical prescription!",
            error: error.message,
        });
    }
}


