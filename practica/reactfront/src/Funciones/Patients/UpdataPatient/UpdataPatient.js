import Sidebar from "../../../Sidebar.js";
import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserRound, Phone, MapPin, Calendar, Ruler, Weight, Droplet, PersonStanding, Mail,Newspaper  } from 'lucide-react';
import { useWallet } from "../../../WalletProvider.js";
import { ethers } from "ethers";

const URI = 'http://localhost:8000/patients/'

const UpdatePatients = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const navigate = useNavigate();
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

    const { contract , administrative} = useWallet();

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

    const updatePatient = async (e) => {
        e.preventDefault();
        try {
            if (!contract) {
                alert("Contract not available. Make sure you are logged in.");
                return;
            }

            if (!administrative) {
                alert("Only administrative staff is allowed.");
                return;
            }
            
            // Verificar el propietario o permisos
            const ownerAddress = await contract.getOwner();
            console.log("Dirección del propietario:", ownerAddress);
    
            // Crear el hash del registro médico
            const patientInfoString = JSON.stringify(patientData);
            const medicalRecordHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(patientInfoString)
            );
            console.log("Hash generado:", medicalRecordHash);
    
            // Llamar a la función del contrato
            const tx = await contract.updatePatient(id, medicalRecordHash); // Usar `id` como número simple
            await tx.wait();
    
            // Actualizar en la base de datos
            const response = await axios.put(`${URI}${id}`, patientData); // Asegúrate de que URI esté definido
            if (response.status === 200 ) {
                
                console.log("Patient successfully updated!");
                setPatientData({
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
                navigate(`/operationsPatients`);
                alert("Patient successfully updated!");
            }
            
            
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An error occurred");
            }
        }
    };
    

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData({
        ...patientData,
        [name]: value,
        });
    };

    // Ejecutar al cargar el componente
    useEffect( ()=> {
        getPatientById();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">

            <Sidebar />
            
            <h2 className="text-2xl font-semibold mb-4">Update Patient Information</h2>
            <p className="text-lg text-gray-700">
                The patient ID that was entered is: <span className="font-bold">{id}</span>
            </p>
            <form onSubmit={updatePatient} className="space-y-6">
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
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <UserRound className="w-4 h-4 mr-2 text-blue-500" />
                            Last name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={patientData.lastName}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="Male">Male</option>
                            <option value="Feminine">Feminine</option>
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter address"
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Insurance number"
                            required
                        />
                        </div>
            
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                            <Ruler className="w-4 h-4 mr-2 text-blue-500" />
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            name="height"
                            value={patientData.height}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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

                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Update Patient
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePatients;
