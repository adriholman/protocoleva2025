import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show() {
    const { test } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={test?.name || 'Test Details'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Name: {test?.name}</h3>
                        <p className="text-gray-800 dark:text-gray-200">Description: {test?.description}</p>
                        <p className="text-gray-800 dark:text-gray-200">Values: {test?.values}</p>
                        <p className="text-gray-800 dark:text-gray-200">Value Options: {test?.value_options}</p>
                        <p className="text-gray-800 dark:text-gray-200">Project: {test?.project?.name || 'No project assigned'}</p>
                        
                        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">General Questions</h4>
                        {test?.general_questions?.length > 0 ? (
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

                        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Value Questions</h4>
                        {test?.value_questions?.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {test.value_questions.map((valueQuestion) => (
                                    <li key={valueQuestion.id} className="text-gray-800 dark:text-gray-200">
                                        {valueQuestion.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-800 dark:text-gray-200">No value questions found.</p>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}