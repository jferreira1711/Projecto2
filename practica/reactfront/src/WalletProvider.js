import React, { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();
// Mueve esto fuera del componente
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isAuthorized",
				"type": "bool"
			}
		],
		"name": "AdministrativeStaffUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "appointmentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "AppointmentRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "appointmentIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "AppointmentRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "appointmentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "AppointmentRemovedById",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "AppointmentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isAuthorized",
				"type": "bool"
			}
		],
		"name": "AuthorizationUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "doctorId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "DoctorRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "DoctorRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isAuthorized",
				"type": "bool"
			}
		],
		"name": "DoctorStaffUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "DoctorUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "medicalPrescriptionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "MedicalPrescriptionRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "medicalPrescriptionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "MedicalPrescriptionRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "medicalReportId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "MedicalReportRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "MedicalReportRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "PatientRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "removedBy",
				"type": "address"
			}
		],
		"name": "PatientRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "registeredBy",
				"type": "address"
			}
		],
		"name": "PatientUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_appointmentHash",
				"type": "bytes32"
			}
		],
		"name": "registerAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_personalInfoHash",
				"type": "bytes32"
			}
		],
		"name": "registerDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_medicalprescriptionHash",
				"type": "bytes32"
			}
		],
		"name": "registerMedicalPrescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_medicalReportHash",
				"type": "bytes32"
			}
		],
		"name": "registerMedicalReport",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_medicalRecordHash",
				"type": "bytes32"
			}
		],
		"name": "registerPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_appointmentIndex",
				"type": "uint256"
			}
		],
		"name": "removeAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appointmentId",
				"type": "uint256"
			}
		],
		"name": "removeAppointmentById",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_doctorId",
				"type": "uint256"
			}
		],
		"name": "removeDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "removeMedicalPrescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "removeMedicalReport",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "removePatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isAuthorized",
				"type": "bool"
			}
		],
		"name": "updateadministrativeStaff",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appointmentId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_appointmentHash",
				"type": "bytes32"
			}
		],
		"name": "updateAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isAuthorized",
				"type": "bool"
			}
		],
		"name": "updateAuthorization",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isAuthorized",
				"type": "bool"
			}
		],
		"name": "updatedoctorStaff",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_medicalRecordHash",
				"type": "bytes32"
			}
		],
		"name": "updatePatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_doctorId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_doctorHash",
				"type": "bytes32"
			}
		],
		"name": "updateRegisterDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "administrativeStaff",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "authorizedMedicalStaff",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "doctorStaff",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_appointmentId",
				"type": "uint256"
			}
		],
		"name": "getAppointmentById",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getAppointments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "appointmentHash",
						"type": "bytes32"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct PatientManagementSystem.Appointment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_doctorId",
				"type": "uint256"
			}
		],
		"name": "getDoctoeRecordHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicalPrescriptionId",
				"type": "uint256"
			}
		],
		"name": "getMedicalPrescriptionById",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_medicalReportId",
				"type": "uint256"
			}
		],
		"name": "getMedicalReportById",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getPatientRecordHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


export const WalletProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
	const [administrative, setAdministrative] = useState(null);
	const [doctorStaffGroup, setDoctorStaff] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const contractAddress = "0xAB56BdC596BB10fe0742c5e682CDAF5B24667bF4";


    useEffect(() => {
        const connectWallet = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);
    
                const accountAddress = await signer.getAddress();
                setAccount(accountAddress);
    
                console.log(accountAddress);
    
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contract);
    
                const ownerAddress = await contract.getOwner();
    
                setIsOwner(accountAddress.toLowerCase() === ownerAddress.toLowerCase());

				// Verificar si la dirección está en administrativeStaff
				const result = await contract.administrativeStaff(accountAddress);
				setAdministrative(result);

				const result2 = await contract.doctorStaff(accountAddress);
				setDoctorStaff(result2);

            } catch (error) {
                console.error("Error connecting to wallet: ", error);
            }
        };
        connectWallet();
    }, []); // Aquí dejamos las dependencias vacías
    

    return (
        <WalletContext.Provider
        value={{ provider, signer, contract, account, isOwner, administrative , doctorStaffGroup}}
        >
        {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
