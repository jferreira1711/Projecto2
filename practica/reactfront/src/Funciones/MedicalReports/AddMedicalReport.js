import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Calendar, Clipboard, User } from "lucide-react";
import Sidebar from "../../Sidebar.js";
import { useWallet } from "../../WalletProvider.js";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/appointments/'
const MEDICAL_REPORT_URI = "http://localhost:8000/medicalreports";

const AddMedicalReport = () => {

    const { id } = useParams(); // Extract the id parameter from the URL
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState({
        PatientID: "",
        DoctorID: "",
        AppointmentDate: "",
        AppointmentTime: "",
        Reason: "",
        Status: "",
    });

    const { contract , doctorStaffGroup} = useWallet();

    const getAppointmentById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            const appointment = response.data;

            // Actualizar datos de la cita médica
            setAppointmentData(appointment);

            // Actualizar los datos iniciales del reporte médico con valores de la cita médica
            setMedicalReportData((prevState) => ({
                ...prevState,
                PatientID: appointment.PatientID,
                DoctorID: appointment.DoctorID,
                ReportDate: appointment.AppointmentDate, // Asumimos que la fecha del reporte es la misma que la cita
            }));
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("The medical appointment information could not be loaded.");
            }
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

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicalReportData({
          ...medicalReportData,
          [name]: value,
        });
    };

    const getLastMedicalReportId = async () => {
        try {
          const response = await axios.get(`${MEDICAL_REPORT_URI}/last/report`);
          return response.data?.ReportID; // Asumiendo que el endpoint devuelve un objeto con ReportID
        } catch (error) {
          console.error("Error fetching last medical report:", error);
          alert("Error getting the latest medical report.");
          return null;
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {

            if (!contract) {
                alert("Contract not available. Make sure you are logged in.");
                return;
            }
            if (!doctorStaffGroup) {
            alert("Only medical personnel are allowed.");
            return;
            }
            const updatedAppointment = { ...appointmentData, Status: "Completed" };
            await axios.put(`${URI}${id}`, updatedAppointment);
            const response = await axios.post("http://localhost:8000/medicalreports", medicalReportData);
            if (response.status === 200) {
                
                setMedicalReportData({
                    PatientID: "",
                    DoctorID: "",
                    ReportDate: "",
                    Diagnosis: "",
                    Treatment: "",
                    Notes: "",
                });
            }
            // Serializar la información del paciente y crear el hash
            const medicalReportString = JSON.stringify(medicalReportData);
            const medicalReportHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(medicalReportString)
            );

            // Llamar a la función del contrato
            const tx = await contract.registerMedicalReport(medicalReportHash);
            await tx.wait();


            // Serializar la información del paciente y crear el hash
            const appointmentString = JSON.stringify(appointmentData);
            const appointmentHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(appointmentString)
            );

            // Llamar a la función del contrato
            const tx2 = await contract.updateAppointment(id, appointmentHash);
            await tx2.wait();

            

            const lastReportId = await getLastMedicalReportId();
            if (lastReportId) {
                alert("Medical report added successfully!");
                navigate(`/addPrescription/${lastReportId}`);
            } else {
                alert("Error redirecting to prescription form.");
            }
            
            
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message); // Mensaje específico desde el backend
            } else {
                console.error("Error registering medical report:", error);
                alert("There was an error while recording the medical report. Please check the console for more details.");
            }
        }
    };
    
    useEffect( ()=> {
        getAppointmentById();
    }, []);


    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />

            <h2 className="text-2xl font-semibold mb-4">Medical report registration</h2>
            <p className="text-sm text-gray-600 mb-4">Please complete all fields in the form</p>

            <form  onSubmit={handleSubmit} className="space-y-6">
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                        onChange={handleChange}
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
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter diagnosis"
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
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter the treatment"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                            Notes
                        </label>
                        <textarea
                            name="Notes"
                            value={medicalReportData.Notes}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter the note"
                            rows="4"
                            required
                        />
                    </div>

                </div>

                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddMedicalReport;