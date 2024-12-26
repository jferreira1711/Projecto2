import Sidebar from "../../Sidebar.js";
import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Clock , Calendar, Clipboard, User, Check } from "lucide-react";

const URI = 'http://localhost:8000/appointments/'

const ShowInfoAppointment = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [appointmentData, setAppointmentData] = useState({
            PatientID: "",
            DoctorID: "",
            AppointmentDate: "",
            AppointmentTime: "",
            Reason: "",
            Status: "",
    });


    const getAppointmentById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setAppointmentData(response.data); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("The medical appointment information could not be loaded.");
            }
        }
    };




    
    useEffect( ()=> {
        getAppointmentById();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Medical appointment information</h2>
            <p className="text-lg text-gray-700">
                The medical appointment ID is: <span className="font-bold">{id}</span>
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
                        value={appointmentData.PatientID}

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

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    >
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Completed">Completed</option>
                    </select>
                </div>
            
            </div> 
            
        </div>
    );

}


export default ShowInfoAppointment;