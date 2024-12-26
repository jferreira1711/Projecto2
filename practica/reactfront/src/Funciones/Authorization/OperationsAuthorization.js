import { Link } from 'react-router-dom';
import React from "react";
import Sidebar from '../../Sidebar';


const OperationsAuthorization = () => {

    
    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Assignment of permissions</h2>
            <p className="text-sm text-gray-600 mb-4">
                Please select what type of option you need
            </p>
            <div className="flex justify-center mt-8">
                <Link to="/authorizationAdministrative"  className="no-underline text-white"> 
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8  w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Administrative
                    </button>
                </Link>
            </div>

            <div className="flex justify-center mt-8">
                <Link to="/authorizationDoctor"  className="no-underline text-white"> 
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8  w-64 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Doctors
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default OperationsAuthorization;