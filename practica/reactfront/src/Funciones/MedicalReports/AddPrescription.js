import { useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Sidebar from "../../Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Clipboard, User } from "lucide-react";
import { useWallet } from "../../WalletProvider.js";
import { ethers } from "ethers";


const URI2 = "http://localhost:8000/appointments/";
const AddPrescription = () => {
    const { id } = useParams(); // Obtener el ID del reporte de la URL
    const navigate = useNavigate();
    const { contract , doctorStaffGroup} = useWallet();

    const [medicalReportData, setMedicalReportData] = useState({
        ReportID: "",
        PatientID: "",
        DoctorID: "",
        ReportDate: "",
        Diagnosis: "",
        Treatment: "",
        Notes: "",
    })

    const [prescriptionData, setPrescriptionData] = useState({
        MedicalReportID: "",
        Medication: "",
        Dosage: "",
        Duration: "",
        Instructions: "",
        Guidelines: "",
    })



    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionData({
          ...prescriptionData,
          [name]: value,
        });
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

            const response = await axios.post("http://localhost:8000/prescriptions", prescriptionData);
            if (response.status === 201) {
                
                setPrescriptionData({
                    MedicalReportID: "",
                    Medication: "",
                    Dosage: "",
                    Duration: "",
                    Instructions: "",
                    Guidelines: "",
                });
            }
            // Serializar la información del paciente y crear el hash
            const prescriptionString = JSON.stringify(prescriptionData);
            const prescriptionHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(prescriptionString)
            );
            
            // Llamar a la función del contrato
            const tx = await contract.registerMedicalPrescription(prescriptionHash);
            await tx.wait();
            
            alert("Medical prescription added successfully!");
            navigate(-2);

            

    
            
            
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message); // Mensaje específico desde el backend
            } else {
                console.error("Error when registering the medical prescription:", error);
                alert("There was an error registering the prescription. Check the console for more details..");
            }
        }
    };

    useEffect( ()=> {
        setPrescriptionData((prevState) => ({
            ...prevState,
            MedicalReportID: id,
        }));
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />

            <h2 className="text-2xl font-semibold mb-4">Medical prescription record</h2>
            <p className="text-sm text-gray-600 mb-4">Please complete all fields in the form</p>

            <form  onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            Medical report id
                        </label>
                        <input
                            type="text"
                            name="MedicalReportID"
                            value={prescriptionData.MedicalReportID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter the medical report ID"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            Medication
                        </label>
                        <input
                            type="text"
                            name="Medication"
                            value={prescriptionData.Medication}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter medication"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            Dosage
                        </label>
                        <input
                            type="text"
                            name="Dosage"
                            value={prescriptionData.Dosage}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter dosage"
                            required
                        />
                    </div>


                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            Duration
                        </label>
                        <input
                            type="text"
                            name="Duration"
                            value={prescriptionData.Duration}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter duration"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                            Instructions
                        </label>
                        <textarea
                            name="Instructions"
                            value={prescriptionData.Instructions}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter instructions"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                            Guidelines
                        </label>
                        <textarea
                            name="Guidelines"
                            value={prescriptionData.Guidelines}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter guidelines"
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
                        Finish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPrescription;

