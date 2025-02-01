import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/usuarios')
            .then(response => {
                console.log('Usuarios recibidos:', response.data); // Verifica si llegan datos
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4">Lista de Usuarios Registrados</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2">Nombre</th>
                                    <th className="border p-2">Correo</th>
                                    <th className="border p-2">Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} className="text-center">
                                        <td className="border p-2">{user.name}</td>
                                        <td className="border p-2">{user.email}</td>
                                        <td className="border p-2">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
