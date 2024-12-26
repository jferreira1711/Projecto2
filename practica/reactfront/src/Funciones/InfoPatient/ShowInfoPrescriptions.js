import React, { useState, useRef , useEffect} from 'react';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from '../../Sidebar.js';


const URI = "http://localhost:8000/prescriptions/";
const URI2 = "http://localhost:8000/medicalreports/";
const URI3 = "http://localhost:8000/patients/";
const URI4 = "http://localhost:8000/doctors/";

const MedicalPrescription = () => {
    const { id } = useParams(); // Extract the id parameter from the URL
    const prescriptionRef = useRef(null);
    const [formData, setFormData] = useState({
        patientName: "",
        patientID: "",
        patientAge: "30",
        patientGender: "",
        patientAddress: "",
        patientPhone: "",
        diagnosis: "",
        medication: "",
        dosage: "",
        duration: "",
        instructions: "",
        doctorName: "Dr. Carlos Ramírez",
        date: new Date().toLocaleDateString('es-PE'),
    });

    const downloadAsPDF = () => {
        if (prescriptionRef.current) {
        html2pdf()
            .set({
            margin: 0.5, // Reducir márgenes
            filename: "receta-medica.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 1.5 }, // Escalar ligeramente menos
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            })
            .from(prescriptionRef.current)
            .save();
        }
    };
    const [prescriptionData, setPrescriptionData] = useState({
            MedicalReportID: "",
            Medication: "",
            Dosage: "",
            Duration: "",
            Instructions: "",
            Guidelines: "",
    })

    const [medicalReportData, setMedicalReportData] = useState({
            PatientID: "",
            DoctorID: "",
            ReportDate: "",
            Diagnosis: "",
            Treatment: "",
            Notes: "",
    })

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

    const getAllInfo = async () => {
        try {
            const response = await axios.get(`${URI}/byId/${id}`);
            const data = response.data; // Datos obtenidos del servidor
    
            // Actualizar `prescriptionData` si es necesario
            setPrescriptionData(data);
    
            // Actualizar `formData` directamente con los datos obtenidos
            setFormData((prevState) => ({
                ...prevState,
                medication: data.Medication,
                dosage: data.Dosage,
                duration: data.Duration,
                instructions: data.Instructions,
            }));

            const response2 = await axios.get(`${URI2}${data.MedicalReportID}`);
            const data2 = response2.data; // Datos obtenidos del servidor
            setMedicalReportData(data2);

            setFormData((prevState) => ({
                ...prevState,
                diagnosis: data2.Diagnosis,
            }));

            const response3 = await axios.get(`${URI3}${data2.PatientID}`);
            const data3 = response3.data; // Datos obtenidos del servidor
            setPatientData(data3);

            const birthDate = new Date(data3.birthDate);
            const age = new Date().getFullYear() - birthDate.getFullYear();

            setFormData((prevState) => ({
                ...prevState,
                patientName: `${data3.firstName} ${data3.lastName} `,
                patientID: data3.id,
                patientGender: data3.gender,
                patientAddress: data3.address,
                patientPhone: data3.phone,
                patientAge: age


            }));

            const response4 = await axios.get(`${URI4}${data2.DoctorID}`);
            const data4 = response4.data; // Datos obtenidos del servidor
            setMedicalReportData(data4);

            setFormData((prevState) => ({
                ...prevState,
                doctorName: `${data4.FirstName} ${data4.LastName} `,
            }));


        } catch (error) {
            if (error.response?.status === 404) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("The prescription information could not be loaded.");
            }
        }
    };
    

    useEffect( ()=> {
          getAllInfo();
    }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <Sidebar />
      
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Prescription</h1>
            <p className="text-sm text-gray-600">View and download recipe</p>
          </div>

          {/* Prescription Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div ref={prescriptionRef} className="p-4">
              {/* Clinic Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-blue-800">Hospital JS</h2>
                <p className="text-sm text-gray-600">JR. LIMA 0773 - Phone: (01) 123-4567</p>
                <div className="mt-2 h-0.5 bg-blue-800 rounded-full"></div>
              </div>

              {/* Patient Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
                <h3 className="text-base font-bold text-gray-900 mb-2">PATIENT INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <InfoRow label="Name" value={formData.patientName} />
                    <InfoRow label="ID" value={formData.patientID} />
                    <InfoRow label="Age" value={formData.patientAge} />
                    <InfoRow label="Gender" value={formData.patientGender} />
                  </div>
                  <div>
                    <InfoRow label="Address" value={formData.patientAddress} />
                    <InfoRow label="Phone" value={formData.patientPhone} />
                    <InfoRow label="Date" value={formData.date} />
                  </div>
                </div>
              </div>

              {/* Prescription Details */}
              <div className="mb-6 text-sm">
                <h3 className="text-base font-bold text-gray-900 mb-3">PRESCRIPTION</h3>
                <div className="space-y-4">
                  <DetailItem label="Diagnosis" value={formData.diagnosis} />
                  <DetailItem label="Medicine" value={formData.medication} />
                  <DetailItem label="Dose" value={formData.dosage} />
                  <DetailItem label="Duration of Treatment" value={formData.duration} />
                  <DetailItem label="Instructions" value={formData.instructions} />
                </div>
              </div>

              {/* Doctor Signature */}
              <div className="text-center mt-8">
                <div className="inline-block border-t border-gray-300 pt-2">
                  <p className="font-bold text-gray-900 text-sm">Dr. {formData.doctorName}</p>
                  <p className="text-xs text-gray-600">Attending Doctor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={downloadAsPDF}
              className="inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              <Download className="w-4 h-4 mr-1" />
              Download PDF
            </button>
          </div>
        </div>
  
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <p className="flex justify-between text-xs">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </p>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="pb-2 border-b border-gray-200">
    <p className="text-gray-600 text-xs mb-0.5 font-medium">{label}</p>
    <p className="text-gray-900 text-xs">{value || '-'}</p>
  </div>
);

export default MedicalPrescription;
