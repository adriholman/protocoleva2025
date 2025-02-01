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
                        <h3 className="text-lg font-semibold mb-4">List of Enterprises</h3>
                        <Link href="/enterprises/create" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Create Enterprise</Link>

                        <table className="w-full border-collapse border border-gray-300 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enterprises.length > 0 ? enterprises.map((enterprise) => (
                                    <tr key={enterprise.id} className="text-center">
                                        <td className="border p-2">{enterprise.name}</td>
                                        <td className="border p-2">{enterprise.email}</td>
                                        <td className="border p-2">
                                            <Link href={`/enterprises/${enterprise.id}/edit`} className="text-blue-500">Edit</Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="border p-2 text-center text-gray-500">No enterprises found.</td>
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

