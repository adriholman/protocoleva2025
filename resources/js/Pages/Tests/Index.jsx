import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { FaPlus, FaEye, FaPlay, FaShareAlt, FaEdit, FaCheck } from 'react-icons/fa';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ tests, csrf_token }) {
    const { auth } = usePage().props;
    const userRole = auth.user.role.name;

    const handleToggleReady = (testId) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/tests/${testId}/toggle-ready`;

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
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Tests</h2>}
        >
            <Head title="Tests" />

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
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Está Listo</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.length > 0 ? tests.map((test) => (
                                    <tr key={test.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.description}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.project?.name || 'Sin proyecto'}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.is_ready ? 'Sí' : 'No'}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <div className="flex justify-center space-x-2">
                                                {userRole === 'admin' && (
                                                    <Link href={`/tests/${test.id}`} className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform">
                                                        <FaEye size={20} />
                                                    </Link>
                                                )}
                                                {userRole === 'director' && (
                                                    <>
                                                        <Link href={`/tests/${test.id}/edit`} className="text-blue-500 dark:text-blue-300 hover:scale-110 transition-transform">
                                                            <FaEdit size={20} />
                                                        </Link>
                                                        {!test.is_ready && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleReady(test.id)}
                                                                className="text-green-500 dark:text-green-300 hover:scale-110 transition-transform"
                                                            >
                                                                <FaCheck size={20} />
                                                            </button>
                                                        )}
                                                        {test.is_ready ? (
                                                            <Link href={`/tests/${test.id}/invite`} className="text-yellow-500 dark:text-yellow-300 hover:scale-110 transition-transform">
                                                                <FaShareAlt size={20} />
                                                            </Link>
                                                        ) : null}
                                                    </>
                                                )}
                                                {userRole === 'evaluator' && test.is_ready && test.users[0]?.pivot?.completed === 0 && (
                                                    <Link href={`/tests/${test.id}/complete`} className="text-green-500 dark:text-green-300 hover:scale-110 transition-transform">
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

