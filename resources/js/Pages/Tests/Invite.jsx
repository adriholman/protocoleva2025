import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUserPlus } from 'react-icons/fa';

export default function Invite() {
    const { test, users } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        user_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tests.sendInvites', test.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Invitar Usuarios a ${test.name}`} />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 w-full max-w-2xl">
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                        Enviar invitacion
                    </h3>
                    <h6 className="text-lg  mb-4 text-center text-gray-800 dark:text-gray-200">
                       Invita a realizar a el test  "{test.name}"
                    </h6>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Selección de Usuarios */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Seleccionar Usuarios</label>
                            <select
                                multiple
                                className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
                                value={data.user_ids}
                                onChange={(e) =>
                                    setData('user_ids', [...e.target.selectedOptions].map(option => option.value))
                                }
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.user_ids && <div className="text-red-500 mt-1">{errors.user_ids}</div>}
                        </div>

                        {/* Lista de Usuarios Seleccionados */}
                        {data.user_ids.length > 0 && (
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                                <h4 className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Usuarios Seleccionados:</h4>
                                <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                    {data.user_ids.map((userId) => {
                                        const user = users.find(u => u.id == userId);
                                        return user ? <li key={user.id}>{user.name}</li> : null;
                                    })}
                                </ul>
                            </div>
                        )}

                        {/* Botón de Enviar Invitaciones */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-blue-600 transition"
                            disabled={processing}
                        >
                            <FaUserPlus /> Enviar Invitaciones
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
