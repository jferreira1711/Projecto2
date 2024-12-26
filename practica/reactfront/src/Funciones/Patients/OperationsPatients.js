import { Link } from 'react-router-dom'; // Import Link
import Sidebar from '../../Sidebar.js';

const OperationsPatients = () => {

    return( 
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            
            <h2 className="text-2xl font-semibold mb-4">Patients</h2>
            <p className="text-sm text-gray-600 mb-4">Please select your operation to perform</p>

            <div className="flex justify-end mt-8">
                <Link to="/addPatient"  className="no-underline text-white"> 
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8  w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Add patient
                    </button>
                </Link>
            </div>

            <div className="flex justify-end mt-8">
                <Link to="/idPatient"  className="no-underline text-white"> 
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Update Patient
                    </button>
                </Link>
            </div>
            <div className="flex justify-end mt-8">
                <Link to="/deletePatient"  className="no-underline text-white"> 
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Delete patient
                    </button>
                </Link>
            </div>    
        </div>
    )
}



export default OperationsPatients; 