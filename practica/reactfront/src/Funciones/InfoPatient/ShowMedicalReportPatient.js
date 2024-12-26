import { Link } from 'react-router-dom'; // Import Link
import React, { useState, useEffect} from "react";
import axios from "axios";
import Sidebar from '../../Sidebar';

import { useParams } from "react-router-dom";


const URI2 = 'http://localhost:8000/medicalreports/'


const IdDoctorMedicalReport = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [medicalReportData, setMedicalReportData] = useState([])

 

    const getMedicalReport = async () => {
        try {
            const res = await axios.get(`${URI2}patient/${id}`);
            setMedicalReportData(res.data);
    
            // Verificar si la lista de citas está vacía
            
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`${error.response.data.message}`);
            } else {
                console.error("Error obtaining medical reports:", error);
                alert("No se pudo cargar los reportes medicos.");
            }
            
        }
    };
    

    
    useEffect( ()=> {
        getMedicalReport();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Patient's medical report {id}</h2>
            <p className="text-lg text-gray-700">
                The following list contains the patient's medical reports.
            </p>

            <table className='table'>
                <thead className='table-primary'>
                    <tr>
                        <th>ID</th>
                        <th>ID doctor</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { medicalReportData.map ( (medicalReport) => (
                        <tr key={ medicalReport.ReportID}>
                            <td> { medicalReport.ReportID } </td>
                            <td> { medicalReport.DoctorID } </td>
                            <td> { medicalReport.ReportDate } </td>
                            

                            <td>
                                <Link to={`/showInfoMedicalReport/${medicalReport.ReportID}`} className='btn btn-info'><i className="fa-solid fa-eye"></i></Link>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default IdDoctorMedicalReport;