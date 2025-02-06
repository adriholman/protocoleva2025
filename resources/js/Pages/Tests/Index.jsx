import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { FaPlus, FaEye, FaPlay, FaShareAlt, FaEdit, FaCheck, FaClipboardList, FaClipboardCheck, FaClipboard, FaChartBar } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';

export default function Index({ tests, csrf_token }) {
    const { auth } = usePage().props;
    const userRole = auth.user.role.name;

    const handleToggleStatus = (testId) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/tests/${testId}/toggle-status`;

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrf_token;
        form.appendChild(csrfInput);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Pruebas</h2>}
        >
            <Head title="Pruebas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        
                        {/* Contenedor para Título y Botón */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Lista de Tests</h3>
                            {userRole === 'director' && (
                                <Link 
                                    href="/tests/create" 
                                    className="bg-green-500 text-white px-4 py-2 rounded-md inline-flex items-center"
                                >
                                    <FaPlus className="mr-2" /> Crear
                                </Link>
                            )}
                        </div>

                        {/* Tabla de Tests */}
                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Nombre</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Descripción</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Proyecto</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Estado</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.data.length > 0 ? tests.data.map((test) => (
                                    <tr key={test.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.description}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.project}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.status_display_name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <div className="flex justify-center space-x-2">
                                                {(userRole === 'admin' || userRole === 'director') && (
                                                    <Link href={`/tests/${test.id}`} className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform" title="Ver">
                                                        <FaEye size={20} />
                                                    </Link>
                                                )}
                                                {userRole === 'director' && (
                                                    <>
                                                        <Link href={`/tests/${test.id}/edit`} className="text-orange-500 dark:text-orange-300 hover:scale-110 transition-transform" title="Editar">
                                                            <FaEdit size={20} />
                                                        </Link>
                                                        {test.status === 'draft' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleStatus(test.id)}
                                                                className="text-green-500 dark:text-green-300 hover:scale-110 transition-transform"
                                                                title="Habilitar"
                                                            >
                                                                <FaClipboard size={20} />
                                                            </button>
                                                        )}
                                                        {test.status === 'available' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleStatus(test.id)}
                                                                className="text-yellow-500 dark:text-yellow-300 hover:scale-110 transition-transform"
                                                                title="Finalizar"
                                                            >
                                                                <FaClipboardList size={20} />
                                                            </button>
                                                        )}
                                                        {test.status === 'finished' && (
                                                            <>
                                                                <FaClipboardCheck size={20} className="text-gray-500 dark:text-gray-300" title="Finalizado" />
                                                                <Link href={`/tests/${test.id}/results`} className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform" title="Ver Resultados">
                                                                    <FaChartBar size={20} />
                                                                </Link>
                                                            </>
                                                        )}
                                                        {test.status === 'available' && (
                                                            <Link href={`/tests/${test.id}/invite`} className="text-yellow-500 dark:text-yellow-300 hover:scale-110 transition-transform" title="Invitar">
                                                                <FaShareAlt size={20} />
                                                            </Link>
                                                        )}
                                                    </>
                                                )}
                                                {userRole === 'evaluator' && test.status === 'available' && test.users[0]?.pivot?.completed === 0 && (
                                                    <Link href={`/tests/${test.id}/complete`} className="text-green-500 dark:text-green-300 hover:scale-110 transition-transform" title="Completar">
                                                        <FaPlay size={20} />
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="border p-2 text-gray-800 dark:text-gray-200 text-center">
                                            No se encontraron tests.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Paginación */}
                        <Pagination links={tests.links} />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

