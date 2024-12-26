import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, UserRound, Stethoscope, Calendar, FileText ,ShieldCheck,Home } from 'lucide-react';

const navigationItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/operationsPatients', label: 'Patients', icon: Users },
  { to: '/idPatientInfo', label: 'Patient Info.', icon: UserRound },
  { to: '/operationsDoctor', label: 'Doctors', icon: Stethoscope },
  { to: '/idDoctorInfo', label: 'Doctors Info.', icon: UserRound },
  { to: '/operationsAppointment', label: 'Medical appointments', icon: Calendar },
  { to: '/doctorAccount', label: 'Medical management', icon: FileText },
  { to: '/authorization', label: 'Permission management', icon: ShieldCheck   },
];

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white md:hidden hover:bg-blue-700 transition-colors"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <nav 
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } z-50`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">JS Hospital</h1>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg bg-blue-600 text-white md:hidden hover:bg-blue-700 transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>
        
        <ul className="overflow-y-auto overflow-x-hidden p-0">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  className={`no-underline flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    location.pathname === item.to ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                  onClick={closeMenu}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;