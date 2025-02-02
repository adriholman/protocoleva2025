import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaEdit, FaPlus } from 'react-icons/fa';

export default function ProjectsIndex({ projects }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Proyectos</h2>}
        >
            <Head title="Proyectos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        
                        {/* Contenedor para Título y Botón */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lista de Proyectos</h3>
                            <Link 
                                href="/projects/create" 
                                className="bg-green-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                            >
                                <FaPlus className="mr-2" /> Crear
                            </Link>
                        </div>

                        {/* Tabla de Proyectos */}
                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Nombre</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Descripción</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Empresa</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Límite de Tests</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? projects.map((project) => (
                                    <tr key={project.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.description}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.enterprise?.name || 'Sin empresa'}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.test_limit}</td>
                                        <td className="border-0 p-2 text-gray-800 dark:text-gray-200 flex justify-center">
                                            <Link href={`/projects/${project.id}/edit`} className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform">
                                                <FaEdit size={20} />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="border p-2 text-gray-800 dark:text-gray-200 text-center">
                                            No se encontraron proyectos.
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
