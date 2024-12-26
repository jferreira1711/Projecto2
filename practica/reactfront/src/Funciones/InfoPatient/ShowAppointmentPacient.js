import { Link } from 'react-router-dom'; // Import Link
import React, { useState, useEffect} from "react";
import axios from "axios";
import Sidebar from '../../Sidebar';

import { useParams } from "react-router-dom";


const URI2 = 'http://localhost:8000/appointments/'


const IdDoctorMedicalReport = () => {
    const { id } = useParams(); // Extract the id parameter from the URL

    const [appointmentData, setAppointmentData] = useState([])

 

    const getAppointment = async () => {
        try {
            const res = await axios.get(`${URI2}patient/${id}`);
            setAppointmentData(res.data);
    
            // Verificar si la lista de citas está vacía
            
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`${error.response.data.message}`);
            } else {
                console.error("Error retrieving patient's medical appointment data:", error);
                alert("Failed to load patient's medical appointments.");
            }
            
        }
    };
    

    
    useEffect( ()=> {
        getAppointment();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Patient medical appointments</h2>
            <p className="text-lg text-gray-700">
                The following list contains the patient's quotes.
            </p>

            <table className='table'>
                <thead className='table-primary'>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>State</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { appointmentData.map ( (appointment) => (
                        <tr key={ appointment.IDAppointment}>
                            <td> { appointment.IDAppointment } </td>
                            <td> { appointment.AppointmentDate } </td>
                            <td> { appointment.Status } </td>

                            <td>
                                <Link to={`/showInfoAppointment/${appointment.IDAppointment}`} className='btn btn-info'><i className="fa-solid fa-eye"></i></Link>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default IdDoctorMedicalReport;