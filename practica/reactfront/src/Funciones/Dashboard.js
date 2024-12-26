import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Sidebar from '../Sidebar.js';

const Dashboard = () => {
    

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            {/* Main Content */}
            <div className="p-8 ml-0 md:ml-64 transition-all duration-300">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Hospital San Juan</h2>
                    <p className="text-gray-600 leading-relaxed">
                    Committed to excellence in health care and the well-being of our community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                            alt="Hospital Entrance"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Facilities</h3>
                        <p className="text-gray-600">
                        We have the latest medical technology and spaces designed for your comfort..
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80"
                            alt="Medical Team"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Specialized Personnel</h3>
                        <p className="text-gray-600">
                        Our highly qualified medical team is dedicated to providing the best care..
                        </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-gray-600">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span>Av. Principal 123, Bogota</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Phone className="w-5 h-5 text-blue-600" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <span>contacto@hospitalsanjuan.com</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span>24/7 Attention</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;