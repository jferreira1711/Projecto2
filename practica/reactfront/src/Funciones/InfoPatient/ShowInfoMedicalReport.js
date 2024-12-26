import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Calendar, Clipboard, User } from "lucide-react";
import Sidebar from "../../Sidebar.js";
import axios from "axios";

const URI = 'http://localhost:8000/medicalreports/'

const ShowInfoMedicalReport = () => {

    const { id } = useParams(); // Extract the id parameter from the URL
    

    // Función para obtener los datos del paciente por ID
    const getMedicalReport = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setMedicalReportData(response.data); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error("Error getting patient data:", error);
            alert("Patient information could not be loaded.");
        }
    };

    const [medicalReportData, setMedicalReportData] = useState({
        PatientID: "",
        DoctorID: "",
        ReportDate: "",
        Diagnosis: "",
        Treatment: "",
        Notes: "",
    })


    
    useEffect( ()=> {
        getMedicalReport();
    }, []);


    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />

            <h2 className="text-2xl font-semibold mb-4">Medical report</h2>
            <p className="text-lg text-gray-700">
                The medical report ID is: <span className="font-bold">{id}</span>
            </p>

        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        Patient ID
                    </label>
                    <input
                        type="text"
                        name="PatientID"
                        value={medicalReportData.PatientID}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter patient ID"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        Doctor ID
                    </label>
                    <input
                        type="text"
                        name="DoctorID"
                        value={medicalReportData.DoctorID}
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Doctor ID"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Report date
                    </label>
                    <input
                    type="date"
                    name="ReportDate"
                    value={medicalReportData.ReportDate}
                    
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                        Diagnosis
                    </label>
                    <textarea
                        name="Diagnosis"
                        value={medicalReportData.Diagnosis}
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter the Diagnosis"
                        rows="4"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                        Treatment
                    </label>
                    <textarea
                        name="Treatment"
                        value={medicalReportData.Treatment}
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter the treatment"
                        rows="4"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                        Note
                    </label>
                    <textarea
                        name="Notes"
                        value={medicalReportData.Notes}
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Enter the Note"
                        rows="4"
                        required
                    />
                </div>

            </div>
            
        </div>
    )
}

export default ShowInfoMedicalReport;