import Sidebar from "../../../Sidebar.js";
import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useWallet } from "../../../WalletProvider.js";
import { ethers } from "ethers";
import { UserRound, Phone,Mail,Newspaper  } from 'lucide-react';

const URI = 'http://localhost:8000/doctors/'

const UpdateDoctor = () => {
    const { id } = useParams(); // Extract the id parameter from the URL
    const navigate = useNavigate();

    const [doctorData, setDoctorData] = useState({
            FirstName: "",
            LastName: "",
            Specialty: "",
            PhoneNumber: "",
            Email: "",
            LicenseNumber: "",
    });
    
    const { contract , administrative} = useWallet();

    const getDoctorById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setDoctorData(response.data); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error("Error getting doctor's data:", error);
            alert("Doctor information could not be loaded.");
        }
    };
    
    const updateDoctor = async (e) => {
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
    
            const doctorInfoString = JSON.stringify(doctorData);
            const doctorRecordHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(doctorInfoString)
            );
            
            console.log("Hash generado:", doctorRecordHash);
    
            // Llamar a la función del contrato
            const tx = await contract.updateRegisterDoctor(id, doctorRecordHash); // Usar `id` como número simple
            await tx.wait();
    
            // Actualizar en la base de datos
            const response = await axios.put(`${URI}${id}`, doctorData); // Asegúrate de que URI esté definido
            if (response.status === 200) {
                navigate(`/operationsDoctor`);
                alert("Information successfully updated!");
                setDoctorData({
                    FirstName: "",
                    LastName: "",
                    Specialty: "",
                    PhoneNumber: "",
                    Email: "",
                    LicenseNumber: "",
                });
            }
            
        } catch (error) {
            console.error("Error updating doctor information:", error);
            alert("Could not update doctor information.");
        }
    };

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
        ...doctorData,
        [name]: value,
        });
    };
    
    useEffect( ()=> {
        getDoctorById();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Update Doctor Information</h2>
            <p className="text-lg text-gray-700">
                The doctor ID that was entered is: <span className="font-bold">{id}</span>
            </p>
            <form onSubmit={updateDoctor} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <UserRound className="w-4 h-4 mr-2 text-blue-500" />
                        Name
                        </label>
                        <input
                        type="text"
                        name="FirstName"
                        value={doctorData.FirstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter name"
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
                        name="LastName"
                        value={doctorData.LastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter last name"
                        required
                        />
                    </div>
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <UserRound className="w-4 h-4 mr-2 text-blue-500" />
                        Specialty
                        </label>
                        <input
                        type="text"
                        name="Specialty"
                        value={doctorData.Specialty}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Specialty"
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
                        name="PhoneNumber"
                        value={doctorData.PhoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter phone number"
                        required
                        />
                    </div>
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Mail className="w-4 h-4 mr-2 text-blue-500" />
                        Email
                        </label>
                        <input
                        type="email"
                        name="Email"
                        value={doctorData.Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email"
                        required
                        />
                    </div>
                    <div>
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Newspaper  className="w-4 h-4 mr-2 text-blue-500" />
                        License number
                        </label>
                        <input
                        type="text"
                        name="LicenseNumber"
                        value={doctorData.LicenseNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="License number"
                        required
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Update doctor
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateDoctor;