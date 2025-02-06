import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import Pagination from '@/Components/Pagination';

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
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enterprises.data.length > 0 ? enterprises.data.map((enterprise) => (
                                    <tr key={enterprise.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.email}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <div className="flex justify-center space-x-2">
                                                <Link href={`/enterprises/${enterprise.id}/edit`} className="inline-flex justify-center">
                                                    <FaEdit size={20} className="text-blue-500 dark:text-blue-300" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="border p-2 text-gray-800 dark:text-gray-200 text-center">
                                            No se encontraron empresas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Paginación */}
                        <Pagination links={enterprises.links} />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
