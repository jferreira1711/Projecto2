import React, { useState } from "react";
import Sidebar from "../../Sidebar.js";
import { useNavigate } from "react-router-dom";
import { KeyRound } from 'lucide-react';
import axios from 'axios'; // Importar Axios
import { useWallet } from "../../WalletProvider.js";

const DeleteDoctor = () => {
    const [idDoctor, setIdDoctor] = useState("");
    const navigate = useNavigate();
    const { contract , administrative } = useWallet();

    
    const handleSubmit = async () => {
        if (!idDoctor) {
            alert("Please enter a valid doctor ID");
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

            
            
            // Verificar el propietario o permisos
            const ownerAddress = await contract.getOwner();
            console.log("Dirección del propietario:", ownerAddress);
            
            const response = await axios.get(`http://localhost:8000/doctors/${idDoctor}`);
            if (response.data) {
                const response2 = await axios.delete(`http://localhost:8000/doctors/${idDoctor}`);
                if (response2.status === 200) {
                    // Llamar a la función del contrato
                    const tx = await contract.removeDoctor(idDoctor); // Usar `id` como número simple
                    await tx.wait();
                    navigate(`/operationsDoctor`);
                    alert("Doctor successfully removed!");

                    
                }
            } else{
                alert("Doctor ID does not exist!");
                return;
            }
    
            

            
        } catch (error) {
            if (error.response?.status === 404) {
                alert("Doctor ID does not exist.");
            } else {
                alert("An error occurred while trying to delete the doctor.");
            }
        }
    };

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Delete doctor</h2>
            <p className="text-sm text-gray-600 mb-4">Please enter the ID of the doctor to be deleted</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center">
                        <KeyRound className="w-5 h-5 text-blue-500" />
                    </span>
                    <input
                        type="text"
                        name="address"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Doctor's Id"
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
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteDoctor;