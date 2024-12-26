import './App.css';
import Logins from './usuarios/Logins.js';
import Dashboard from './Funciones/Dashboard.js';
import AddPatient from './Funciones/Patients/AddPatient.js';
import OperationsAuthorization from './Funciones/Authorization/OperationsAuthorization.js';
import AddDoctor from './Funciones/Doctors/AddDoctor.js'
import AddMedicalReport from './Funciones/MedicalReports/AddMedicalReport.js'
import OperationsPatients from './Funciones/Patients/OperationsPatients.js'
import IdPatient from './Funciones/Patients/UpdataPatient/IdPatient.js';
import UpdatePatients from './Funciones/Patients/UpdataPatient/UpdataPatient.js';
import DeletePatient from './Funciones/Patients/DeletePatient.js';
import AuthorizationAdministrative from './Funciones/Authorization/AuthorizationAdministrative.js';
import AuthorizationDoctor from './Funciones/Authorization/AuthorizationDoctor.js';
import OperationsDoctors from './Funciones/Doctors/OperationsDoctor.js';
import IdDoctor from './Funciones/Doctors/UpdateDoctor/IdDoctor.js';
import UpdateDoctor from './Funciones/Doctors/UpdateDoctor/UpdateDoctor.js';
import DeleteDoctor from './Funciones/Doctors/DeleteDoctor.js';
import OperationsAppointment from './Funciones/Appointment/OperationsAppointment.js'
import AddAppointment from './Funciones/Appointment/AddAppointment.js';
import IDAppointment from './Funciones/Appointment/UpdateAppointment/IdAppointment.js';
import UpdateAppointment from './Funciones/Appointment/UpdateAppointment/UpdateAppointments.js';
import DeleteAppointment from './Funciones/Appointment/DeleteAppointment.js';
import IdDoctorMedicalReport from './Funciones/MedicalReports/IdDoctorMedicalReport.js';
import DoctorMedicalReport from './Funciones/MedicalReports/DoctorMedicalReport.js'
import AddPrescription from './Funciones/MedicalReports/AddPrescription.js'
import IdPatientInfo from './Funciones/InfoPatient/IdPatientInfo.js';
import ShowInfoPatient from './Funciones/InfoPatient/ShowInfoPatient.js'
import ShowAppointmentPaciente from './Funciones/InfoPatient/ShowAppointmentPacient.js'
import ShowMedicalReportPatient from './Funciones/InfoPatient/ShowMedicalReportPatient.js'
import ShowPrescription from './Funciones/InfoPatient/ShowPrescriptions.js'
import ShowInfoAppointment from './Funciones/InfoPatient/ShowInforAppointment.js'
import ShowInfoMedicalReport from './Funciones/InfoPatient/ShowInfoMedicalReport.js'
import ShowInfoPrescriptions from './Funciones/InfoPatient/ShowInfoPrescriptions.js'
import IdDoctorInfo from './Funciones/InfoDoctor/IdDoctorInfo.js'
import ShowDoctorInfo from './Funciones/InfoDoctor/ShowDoctorInfo.js'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WalletProvider } from './WalletProvider.js'; // Importa el contexto de la cartera

function App() {
  return (
    <div className="App">
        {/* Envolvemos todo en WalletProvider para que el contexto esté disponible */}
        <WalletProvider>
          <BrowserRouter>
            <Routes>
              {/* Definimos las rutas */}
              <Route path="/" element={<Logins />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/operationsPatients" element={<OperationsPatients />} />
              <Route path="/addPatient" element={<AddPatient />} />
              <Route path="/idPatient" element={<IdPatient />} />
              <Route path="/updatePatients/:id" element={<UpdatePatients />} />
              <Route path="/deletePatient" element={<DeletePatient />} />
              <Route path="/idPatientInfo" element={<IdPatientInfo />} />
              <Route path="/showInfoPateint/:id" element={<ShowInfoPatient />} />
              <Route path="/showAppointmentPaciente/:id" element={<ShowAppointmentPaciente />} />
              <Route path="/showPrescription/:id" element={<ShowPrescription />} />
              <Route path="/showInfoAppointment/:id" element={<ShowInfoAppointment />} />
              <Route path="/showInfoMedicalReport/:id" element={<ShowInfoMedicalReport />} />
              <Route path="/showInfoPrescriptions/:id" element={<ShowInfoPrescriptions />} />

              <Route path="/showMedicalReportPatient/:id" element={<ShowMedicalReportPatient />} />
              <Route path="/operationsDoctor" element={<OperationsDoctors />} />
              <Route path="/addDoctor" element={<AddDoctor />} />
              <Route path="/idDoctor" element={<IdDoctor />} />
              <Route path="/updateDoctor/:id" element={<UpdateDoctor />} />
              <Route path="/deleteDoctor" element={<DeleteDoctor />} />
              <Route path="/idDoctorInfo" element={<IdDoctorInfo />} />
              <Route path="/showDoctorInfo/:id" element={<ShowDoctorInfo />} />

              <Route path="/operationsAppointment" element={<OperationsAppointment />} />
              <Route path="/addAppointment" element={<AddAppointment />} />
              <Route path="/idAppointment" element={<IDAppointment />} />
              <Route path="/updateAppointment/:id" element={<UpdateAppointment />} />
              <Route path="/deleteAppointment" element={<DeleteAppointment />} />
              <Route path="/doctorAccount" element={<IdDoctorMedicalReport />} />
              <Route path="/doctorAccount/:id" element={<DoctorMedicalReport />} />
              <Route path="/addMedicalReport/:id" element={<AddMedicalReport />} />
              <Route path="/addPrescription/:id" element={<AddPrescription />} />
              <Route path="/authorization" element={<OperationsAuthorization />} />
              <Route path="/authorizationAdministrative" element={<AuthorizationAdministrative />} />
              <Route path="/authorizationDoctor" element={<AuthorizationDoctor />} />
              
            </Routes>
          </BrowserRouter>
        </WalletProvider>
    </div>
  );
}

export default App;
