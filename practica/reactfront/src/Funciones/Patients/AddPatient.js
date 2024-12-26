import React, { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { UserRound, Phone, MapPin, Calendar, Ruler, Weight, Droplet, PersonStanding, Mail,Newspaper  } from 'lucide-react';
import Sidebar from "../../Sidebar.js";
import { useWallet } from "../../WalletProvider.js";

const AddPatientForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
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
      const ownerAddress = await contract.getOwner();
      console.log(ownerAddress);

      // Serializar la información del paciente y crear el hash
      const patientInfoString = JSON.stringify(patientData);
      const medicalRecordHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(patientInfoString)
      );

      console.log("Hash generado:", medicalRecordHash);

      // Llamar a la función del contrato
      const tx = await contract.registerPatient(medicalRecordHash);
      await tx.wait();

      const response = await axios.post("http://localhost:8000/patients", patientData);
      if (response.status === 200) {
        alert("Patient added successfully!");
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
      }
    

    } catch (error) {
      console.error("Error registering patient:", error);
      alert("There was an error registering the patient. Check the console for more details..");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      
      <Sidebar />

      <h2 className="text-2xl font-semibold mb-4">Patient Registration</h2>
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
              name="firstName"
              value={patientData.firstName}
              onChange={handleChange}
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter last name"
              required
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <PersonStanding  className="w-4 h-4 mr-2 text-blue-500" />
              Gender
            </label>
            <select
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select type</option>
              <option value="male">Male</option>
              <option value="feminine">Feminine</option>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              BirthDate
            </label>
            <input
              type="date"
              name="birthDate"
              value={patientData.birthDate}
              onChange={handleChange}
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
              onChange={handleChange}
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
            Register Patient
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default AddPatientForm;
