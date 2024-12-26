import Sidebar from '../../Sidebar.js';
import { Link } from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserRound, Phone, MapPin, Calendar, Ruler, Weight, Droplet, PersonStanding, Mail,Newspaper  } from 'lucide-react';


const URI = 'http://localhost:8000/patients/'

const UpdatePatients = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [patientData, setPatientData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        address: "",
        phone: "",
        insurance_number: "",
        height: "",
        weight: "",
        birthDate: "",
        bloodType: "",
    });


    // Función para obtener los datos del paciente por ID
    const getPatientById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setPatientData(response.data); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error("Error getting patient data:", error);
            alert("Patient information could not be loaded.");
        }
    };

    // Ejecutar al cargar el componente
    useEffect( ()=> {
        getPatientById();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
            <p className="text-lg text-gray-700">
                The patient ID that was entered is: <span className="font-bold">{id}</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <UserRound className="w-4 h-4 mr-2 text-blue-500" />
                        Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={patientData.firstName}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <UserRound className="w-4 h-4 mr-2 text-blue-500" />
                        Apellido
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={patientData.lastName}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Last name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <PersonStanding className="w-4 h-4 mr-2 text-blue-500" />
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={patientData.gender || ""} // Mostrar el valor actual o un string vacío por defecto

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="">Select type</option>
                        <option value="Male">Masculino</option>
                        <option value="Feminine">Femenino</option>
                    </select>
                </div>

                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4 mr-2 text-blue-500" />
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={patientData.email}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email"
                        required
                    />
                </div>
        
                <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={patientData.address}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter the address"
                        required
                    />
                </div>
                    
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Phone className="w-4 h-4 mr-2 text-blue-500" />
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={patientData.phone}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone"
                        required
                    />
                </div>
                    
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Newspaper  className="w-4 h-4 mr-2 text-blue-500" />
                        Insurance number
                    </label>
                    <input
                        type="text"
                        name="insurance_number"
                        value={patientData.insurance_number}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Insurance number"
                        required
                    />
                    </div>
        
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Ruler className="w-4 h-4 mr-2 text-blue-500" />
                        Stature (cm)
                    </label>
                    <input
                        type="number"
                        name="height"
                        value={patientData.height}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Height in cm"
                        min="0"
                        required
                    />
                </div>
        
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Weight className="w-4 h-4 mr-2 text-blue-500" />
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        name="weight"
                        value={patientData.weight}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Weight in kg"
                        min="0"
                        step="0.1"
                        required
                    />
                </div>
        
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        Birthdate
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        value={patientData.birthDate}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Droplet className="w-4 h-4 mr-2 text-blue-500" />
                        Blood type
                    </label>
                    <select
                        name="bloodType"
                        value={patientData.bloodType}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="">Select type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-between mt-6 gap-4">
                <Link to={`/showAppointmentPaciente/${id}`}>
                    <div>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Medical appointments
                        </button>
                    </div>
                </Link>

                <Link to={`/showMedicalReportPatient/${id}`}>
                    <div>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Medical report
                        </button>
                    </div>
                </Link>
                <Link to={`/showPrescription/${id}`}>
                    <div>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Medical prescriptions
                        </button>
                    </div>
                </Link>
            </div>
           
            
        </div>
    );
};

export default UpdatePatients;
