import React, { useState } from "react";
import Sidebar from "../../Sidebar.js";
import { useNavigate } from "react-router-dom";
import { KeyRound } from 'lucide-react';
import axios from 'axios'; // Importar Axios
import { useWallet } from "../../WalletProvider.js";

const DeleteAppointment = () => {
    const [iDAppointment, setIDAppointment] = useState("");
    const navigate = useNavigate();
    const { contract , administrative } = useWallet();

    const handleSubmit = async () => {
        if (!iDAppointment) {
            alert("Please enter a valid ID");
            return;
        }
    
        try {
            if (!contract) {
                alert("Contract not available. Make sure you are logged in.");
                return;
            }

            if (!administrative) {
                alert("Only administrative staff is allowed.");
                return;
            }

            const response2 = await axios.delete(`http://localhost:8000/appointments/${iDAppointment}`);
            if (response2.status === 200) {
                const tx = await contract.removeAppointmentById(iDAppointment); // Usar `id` como número simple
                await tx.wait();
                navigate(`/operationsAppointment`);
                alert("Medical appointment deleted successfully!");

            }
        
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An error occurred while trying to delete the medical appointment.");
            }
        }
    };


    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />

            <h2 className="text-2xl font-semibold mb-4">Delete Medical Appointment</h2>
            <p className="text-sm text-gray-600 mb-4">Please enter the ID of the medical appointment to be deleted</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center">
                        <KeyRound className="w-5 h-5 text-blue-500" />
                    </span>
                    <input
                        type="text"
                        name="address"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter medical appointment ID"
                        value={iDAppointment}
                        onChange={(e) => setIDAppointment(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DeleteAppointment;