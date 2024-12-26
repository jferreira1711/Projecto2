import { Link } from 'react-router-dom'; // Import Link
import React, { useState, useEffect} from "react";
import axios from "axios";
import Sidebar from '../../Sidebar';

import { useParams } from "react-router-dom";


const URI = 'http://localhost:8000/doctors/'
const URI2 = 'http://localhost:8000/appointments/'


const IdDoctorMedicalReport = () => {
    const { id } = useParams(); // Extract the id parameter from the URL


    const [doctorData, setDoctorData] = useState({
        FirstName: "",
        LastName: "",
        Specialty: "",
        PhoneNumber: "",
        Email: "",
        LicenseNumber: "",
    });

    const [appointmentData, setAppointmentData] = useState([])

    const getDoctorById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            setDoctorData(response.data); // Actualizar el estado con los datos obtenidos
        } catch (error) {
            console.error("Error getting doctor's data:", error);
            alert("Doctor information could not be loaded.");
        }
    };

    const getAppointment = async () => {
        try {
            const res = await axios.get(`${URI2}doctor/${id}/pending`);
            setAppointmentData(res.data);
    
            // Verificar si la lista de citas está vacía
            
        } catch (error) {
            if (error.response?.status === 404) {
                alert(`${error.response.data.message}`);
            } else {
                console.error("Error getting doctor's appointment data:", error);
                alert("Could not load doctor's medical appointments.");
            }
            
        }
    };
    

    
    useEffect( ()=> {
        getDoctorById();
        getAppointment();
    }, []);

    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Welcome doctor <span className="font-bold">{doctorData.FirstName} {doctorData.LastName}</span> </h2>
            <p className="text-lg text-gray-700">
                The following list contains your pending appointments.
            </p>

            <table className='table'>
                <thead className='table-primary'>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Status</th>
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
                                <Link to={`/addMedicalReport/${appointment.IDAppointment}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
}

export default IdDoctorMedicalReport;