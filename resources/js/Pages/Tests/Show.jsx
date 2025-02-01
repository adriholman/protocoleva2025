import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show() {
    const { test } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={test.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{test.name}</h3>
                        <p className="text-gray-800 dark:text-gray-200">{test.description}</p>
                        <p className="text-gray-800 dark:text-gray-200">Values: {test.values}</p>
                        <p className="text-gray-800 dark:text-gray-200">Value Options: {test.value_options}</p>
                        <p className="text-gray-800 dark:text-gray-200">Project: {test.project.name}</p>
                        
                        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">General Questions</h4>
                        {test.general_questions.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {test.general_questions.map((question) => (
                                    <li key={question.id} className="text-gray-800 dark:text-gray-200">
                                        <strong>{question.name}:</strong> {question.options}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-800 dark:text-gray-200">No general questions found.</p>
                        )}

                        <Link href={`/tests/${test.id}/edit`} className="text-blue-500 dark:text-blue-300">Edit</Link>
                        <form action={`/tests/${test.id}`} method="POST" style={{ display: 'inline' }}>
                            <input type="hidden" name="_method" value="DELETE" />
                            <button type="submit" className="text-red-500 dark:text-red-300 ml-2">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}