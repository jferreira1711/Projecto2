import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { UserRound, Phone, Mail,Newspaper  } from 'lucide-react';
import Sidebar from "../../Sidebar.js";
import { useWallet } from "../../WalletProvider.js";

const AddDoctor = () => {
    const [doctorData, setDoctorData] = useState({
        FirstName: "",
        LastName: "",
        Specialty: "",
        PhoneNumber: "",
        Email: "",
        LicenseNumber: "",
    });

    const { contract, administrative } = useWallet();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({
          ...doctorData,
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

            if (!administrative) {
                alert("Only administrative staff is allowed.");
                return;
              }

            const doctorInfoString = JSON.stringify(doctorData);
            const doctorRecordHash = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(doctorInfoString)
            );

            console.log("Hash generado:", doctorRecordHash);

            const tx = await contract.registerDoctor(doctorRecordHash);
            await tx.wait();



            const response = await axios.post("http://localhost:8000/doctors/", doctorData);
            if (response.status === 200) {
                alert("Doctor added successfully!");
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
            console.error("Error registering doctor:", error);
            alert("There was an error registering the doctor. Check the console for more details.");
          }
    }

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />

            <h2 className="text-2xl font-semibold mb-4">Doctor's registration</h2>
            <p className="text-sm text-gray-600 mb-4">Please complete all fields in the form</p>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Phone"
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        Register doctor
                    </button>
                </div>
            </form>
        </div>
    );
    
}

export default AddDoctor;