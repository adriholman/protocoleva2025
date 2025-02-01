import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUserEdit, FaPlus } from 'react-icons/fa';

export default function EnterprisesIndex({ enterprises }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Empresas</h2>}
        >
            <Head title="Empresas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        
                        {/* Contenedor para Título y Botón */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lista de Empresas</h3>
                            <Link 
                                href="/enterprises/create" 
                                className="bg-green-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                            >
                                <FaPlus className="mr-2" /> Crear
                            </Link>
                        </div>

                        {/* Tabla de Empresas */}
                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Nombre</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Correo</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">NIF</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Descripción</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Dirección</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Teléfono</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Sitio Web</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enterprises.length > 0 ? enterprises.map((enterprise) => (
                                    <tr key={enterprise.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.email}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.nif}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.description}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.address}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.phone}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <Link href={enterprise.website} target="_blank" className="text-blue-500 dark:text-blue-300 hover:underline">
                                                {enterprise.website}
                                            </Link>
                                        </td>
                                        <td className="border-0 p-2 text-gray-800 dark:text-gray-200 flex justify-center">
                                            <Link href={`/enterprises/${enterprise.id}/edit`} className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform">
                                                <FaUserEdit size={20} />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="border p-2 text-gray-800 dark:text-gray-200 text-center">
                                            No se encontraron empresas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Paginación Estática */}
                        <div className="mt-4 flex justify-center space-x-2">
                            <button className="px-3 py-1 border rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-not-allowed">
                                &laquo; Anterior
                            </button>
                            <span className="px-3 py-1 border rounded-md bg-blue-500 text-white">1</span>
                            <button className="px-3 py-1 border rounded-md bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-not-allowed">
                                Siguiente &raquo;
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
