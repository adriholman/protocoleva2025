import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const { users } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">List of Users</h3>
                        <Link href="/users/create" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Create User</Link>

                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Name</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Email</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Role</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Enterprise</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? users.map((user) => (
                                    <tr key={user.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{user.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{user.email}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{user.role ? user.role.name : 'No role'}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{user.enterprise ? user.enterprise.name : 'No enterprise'}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <Link href={`/users/${user.id}/edit`} className="text-blue-500 dark:text-blue-300">Edit</Link>
                                            <form action={`/users/${user.id}`} method="POST" style={{ display: 'inline' }}>
                                                <input type="hidden" name="_method" value="DELETE" />
                                                <button type="submit" className="text-red-500 dark:text-red-300 ml-2">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="border p-2 text-gray-800 dark:text-gray-200">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}