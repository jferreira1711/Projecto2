import Sidebar from "../../Sidebar.js";
import React, { useState, useEffect} from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { UserRound, Phone,Mail,Newspaper  } from 'lucide-react';

const URI = 'http://localhost:8000/doctors/'

const ShowDoctorInfo = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [doctorData, setDoctorData] = useState({
            FirstName: "",
            LastName: "",
            Specialty: "",
            PhoneNumber: "",
            Email: "",
            LicenseNumber: "",
    });
    

    const getDoctorById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setDoctorData(response.data); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error("Error getting doctor's data:", error);
            alert("Doctor information could not be loaded.");
        }
    };
    
   
    useEffect( ()=> {
        getDoctorById();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Doctor's information</h2>
            <p className="text-lg text-gray-700">
                The doctor ID that was entered is: <span className="font-bold">{id}</span>
            </p>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter Last name"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="License number"
                        required
                        />
                    </div>
                </div>
        </div>
    )
}

export default ShowDoctorInfo;

