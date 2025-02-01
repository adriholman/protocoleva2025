import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function EnterprisesIndex({ enterprises }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Enterprises</h2>}
        >
            <Head title="Enterprises" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">List of Enterprises</h3>
                        <Link href="/enterprises/create" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Create Enterprise</Link>

                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Name</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Email</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">NIF</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Description</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Address</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Phone</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Website</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Actions</th>
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
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{enterprise.website}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <Link href={`/enterprises/${enterprise.id}/edit`} className="text-blue-500 dark:text-blue-300">Edit</Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="8" className="border p-2 text-gray-800 dark:text-gray-200">No enterprises found.</td>
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