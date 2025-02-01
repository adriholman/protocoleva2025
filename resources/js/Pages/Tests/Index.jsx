import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const { tests, csrf_token } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Tests</h2>}
        >
            <Head title="Tests" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">List of Tests</h3>
                        <Link href="/tests/create" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Create Test</Link>

                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Name</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Description</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Project</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Is Ready</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.length > 0 ? tests.map((test) => (
                                    <tr key={test.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.description}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.project.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{test.is_ready ? 'Yes' : 'No'}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            {test.is_ready ? (
                                                    <>                                                
                                                        <Link href={`/tests/${test.id}`} className="text-blue-500 dark:text-blue-300">Show</Link>
                                                        <Link href={`/tests/${test.id}/complete`} className="text-green-500 dark:text-green-300">Complete</Link>
                                                    </>

                                            ) : (
                                                <>
                                                    <Link href={`/tests/${test.id}/edit`} className="text-blue-500 dark:text-blue-300">Edit</Link>
                                                    <form action={`/tests/${test.id}/toggle-ready`} method="POST" style={{ display: 'inline' }}>
                                                        <input type="hidden" name="_token" value={csrf_token} />
                                                        <button type="submit" className="text-green-500 dark:text-green-300 ml-2">
                                                            Mark as Ready
                                                        </button>
                                                    </form>
                                                    <form action={`/tests/${test.id}`} method="POST" style={{ display: 'inline' }}>
                                                        <input type="hidden" name="_token" value={csrf_token} />
                                                        <input type="hidden" name="_method" value="DELETE" />
                                                        <button type="submit" className="text-red-500 dark:text-red-300 ml-2">Delete</button>
                                                    </form>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="border p-2 text-gray-800 dark:text-gray-200">No tests found.</td>
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