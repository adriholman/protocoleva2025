import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaArrowLeft } from 'react-icons/fa';

export default function Show() {
    const { test } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={test?.name || 'Detalles del Test'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        
                        {/* Título y Botón de Volver */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                Detalles del Test
                            </h3>
                            <Link 
                                href="/tests" 
                                className="bg-gray-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                            >
                                <FaArrowLeft className="mr-2" /> Volver a la Lista
                            </Link>
                        </div>

                        {/* Información Principal */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Test: {test?.name || 'Sin nombre'}</h4>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Proyecto: {test?.project?.name || 'No asignado a un proyecto'}</h4>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Descripción:</strong> {test?.description || 'Sin descripción'}</p>
                        </div>

                        {/* Divisoria */}
                        <hr className="border-gray-400 dark:border-gray-600 my-4" />

                        {/* Valores */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Valores</h4>
                            <p className="text-gray-800 dark:text-gray-200">{test?.values || 'No especificado'}</p>
                            <p className="text-gray-800 dark:text-gray-200"><strong>Opciones:</strong> {test?.value_options || 'No especificado'}</p>
                        </div>

                        {/* Divisoria */}
                        <hr className="border-gray-400 dark:border-gray-600 my-4" />

                        {/* Preguntas Generales */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preguntas Generales</h4>
                            {test?.general_questions?.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {test.general_questions.map((question) => (
                                        <li key={question.id} className="text-gray-800 dark:text-gray-200">
                                            <strong>{question.name}:</strong> {question.options}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-800 dark:text-gray-200">No hay preguntas generales.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

