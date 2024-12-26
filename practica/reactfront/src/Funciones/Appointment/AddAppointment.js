import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar.js";
import { Clock , Calendar, Clipboard, User, Check } from "lucide-react";
import { useWallet } from "../../WalletProvider.js";
import { ethers } from "ethers";

const AddAppointment = () => {
    const [appointmentData, setAppointmentData] = useState({
        PatientID: "",
        DoctorID: "",
        AppointmentDate: "",
        AppointmentTime: "",
        Reason: "",
        Status: "",
    });

    const { contract , administrative} = useWallet();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({
          ...appointmentData,
          [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!contract) {
                alert("Contract not available. Make sure you are logged in");
                return;
              }
            if (!administrative) {
                alert("Only administrative staff is allowed.");
                return;
            }
            const response = await axios.post("http://localhost:8000/appointments/", appointmentData);
            console.log(response.status); // Verifica el código de estado
            if (response.status === 200 || response.status === 201) {
                // Serializar la información del paciente y crear el hash
                const appointmentInfoString = JSON.stringify(appointmentData);
                const appointmentRecordHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(appointmentInfoString)
                );
        
                console.log("Hash generado:", appointmentRecordHash);
        
                // Llamar a la función del contrato
                const tx = await contract.registerAppointment(appointmentRecordHash);
                await tx.wait();
                
                alert("Medical appointment added successfully!");
                setAppointmentData({
                    PatientID: "",
                    DoctorID: "",
                    AppointmentDate: "",
                    AppointmentTime: "",
                    Reason: "",
                    Status: "",
                });
            }   

            


        } catch (error) {
            console.error("Error registering medical appointment:", error);
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("There was an error registering the medical appointment. Check the console for more details..");
            }
        }
    };
    

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Medical Appointment Record</h2>
            <p className="text-sm text-gray-600 mb-4">Please complete all fields in the form</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <User className="w-4 h-4 mr-2 text-blue-500" />
                            Patient ID
                        </label>
                        <input
                            type="text"
                            name="PatientID"
                            value={appointmentData.PatientID}
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
                            value={appointmentData.DoctorID}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Doctor ID"
                            required
                        />
                    </div>


                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            Date of medical appointment
                        </label>
                        <input
                            type="date"
                            name="AppointmentDate"
                            value={appointmentData.AppointmentDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Clock  className="w-4 h-4 mr-2 text-blue-500" />
                            Medical appointment time
                        </label>
                        <input
                            type="time"
                            name="AppointmentTime"
                            value={appointmentData.AppointmentTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                            Reason for consultation
                        </label>
                        <textarea
                            name="Reason"
                            value={appointmentData.Reason}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Enter the reason for the medical consultation"
                            rows="4"
                            required
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Check className="w-4 h-4 mr-2 text-blue-500" />
                        Appointment status
                        </label>
                        <select
                        name="Status"
                        value={appointmentData.Status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        >
                        <option value="">State Selection</option>    
                        <option value="Pending">Pending</option>
                        <option value="Canceled">Canceled</option>
                        <option value="Completed">Completed</option>
                        </select>
                    </div>
                
                </div> 
                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Register medical appointment
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddAppointment;