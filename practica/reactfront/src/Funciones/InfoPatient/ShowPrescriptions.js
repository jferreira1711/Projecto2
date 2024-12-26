import { Link } from 'react-router-dom'; // Import Link
import React, { useState, useEffect} from "react";
import axios from "axios";
import Sidebar from '../../Sidebar';

import { useParams } from "react-router-dom";


const URI2 = 'http://localhost:8000/prescriptions/'


const ShowPrescription = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [prescriptionData, setPrescriptionData] = useState([])
 

    const getPrescription = async () => {
        try {
            const res = await axios.get(`${URI2}${id}`);
            setPrescriptionData(res.data);
    
            // Verificar si la lista de citas está vacía
            
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`${error.response.data.message}`);
            } else {
                console.error("Error obtaining prescription data:", error);
                alert("Failed to load medical prescriptions.");
            }
            
        }
    };
    

    
    useEffect( ()=> {
        getPrescription();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Patient's medical prescriptions</h2>
            <p className="text-lg text-gray-700">
            The following list contains the patient's medical prescriptions.
            </p>

            <table className='table'>
                <thead className='table-primary'>
                    <tr>
                        <th>ID</th>
                        <th>Medical Report ID</th>
                        <th>State</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { prescriptionData.map ( (prescription) => (
                        <tr key={ prescription.PrescriptionID}>
                            <td> { prescription.MedicalReportID } </td>
                            <td>{prescription.Status ? "Retired" : "No Retired"}</td>
                            
                            <td>
                                <Link to={`/showInfoPrescriptions/${prescription.PrescriptionID}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default ShowPrescription;