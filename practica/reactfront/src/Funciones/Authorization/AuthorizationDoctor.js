import Sidebar from '../../Sidebar.js';
import { KeyRound } from 'lucide-react';
import { useWallet } from "../../WalletProvider.js";
import React, { useState } from "react";

const AuthorizationDoctor = () => {
    const { contract, isOwner } = useWallet();
    const [providerAddress, setProviderAddress] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);


    const authorizeProvider = async () => {
        console.log(isOwner);
        if (isOwner){
            try {
                const tx = await contract.updatedoctorStaff(providerAddress,isAuthorized);
                await tx.wait();
                alert(`Provider ${providerAddress} authorized successfully`);

            } catch(error) {
                console.error("Only contract owner can authorize different providers");
            }
        }else {
            alert("Only contract owner can call this function");
        }
    }
    
    return(
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <Sidebar />
            <h2 className="text-2xl font-semibold mb-4">Assignment of permits to doctors</h2>
            <p className="text-sm text-gray-600 mb-4">
                Please write the slope to which you will give permits
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 relative">
                    {/* Contenedor para el input e ícono */}
                    <span className="absolute inset-y-0 left-3 flex items-center">
                        <KeyRound className="w-5 h-5 text-blue-500" />
                    </span>
                    <input
                        type="text"
                        name="address"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter address"
                        value = {providerAddress}
                        onChange={(e) => setProviderAddress(e.target.value)}
                        required
                    />
                </div>
                {/* Campo para estado de autorización */}
                <div className="md:col-span-2">
                    <label htmlFor="isAuthorized" className="block text-sm font-medium text-gray-700 mb-2">
                        Is the enabled?
                    </label>
                    <select
                        id="isAuthorized"
                        name="isAuthorized"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={isAuthorized}
                        onChange={(e) => setIsAuthorized(e.target.value === 'true')}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
            <div className="mt-6">
                <button
                    type="submit"
                    onClick={authorizeProvider}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Update Authorization
                </button>
            </div>
        </div>
    );
}

export default AuthorizationDoctor;