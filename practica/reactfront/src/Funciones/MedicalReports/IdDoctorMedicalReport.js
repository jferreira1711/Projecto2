import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { useNavigate } from "react-router-dom";
import { KeyRound } from 'lucide-react';
import axios from 'axios'; // Importar Axios

const IdDoctorMedicalReport = () => {

    const [idDoctor, setIdDoctor] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        if (!idDoctor) {
            alert("Por favor ingrese un ID de un doctor válido");
            return;
        }

        try {
            // Llamada al backend para comprobar si el ID existe
            const response = await axios.get(`http://localhost:8000/doctors/${idDoctor}`);
            if (response.data) {
                // Si el paciente existe, redirige
                navigate(`/doctorAccount/${idDoctor}`);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An error occurred");
            }
        }
    };
    
    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />

            <h2 className="text-2xl font-semibold mb-4">Medical reports section</h2>
            <p className="text-sm text-gray-600 mb-4">Please enter your doctor ID</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center">
                        <KeyRound className="w-5 h-5 text-blue-500" />
                    </span>
                    <input
                        type="text"
                        name="address"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ingrese su id de medico"
                        value={idDoctor}
                        onChange={(e) => setIdDoctor(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Continue
                </button>
            </div>

        </div>
    )

}

export default IdDoctorMedicalReport;