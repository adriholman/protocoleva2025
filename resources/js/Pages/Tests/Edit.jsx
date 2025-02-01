import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Edit() {
    const { test, projects } = usePage().props;
    const { data, setData, put, errors } = useForm({
        name: test.name,
        description: test.description,
        values: test.values,
        value_options: test.value_options,
        project_id: test.project_id,
        general_questions: test.general_questions.map(question => ({
            id: question.id,
            name: question.name,
            options: question.options,
        })),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tests.update', test.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Test" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Test</h3>
                        <Form data={data} setData={setData} errors={errors} projects={projects} handleSubmit={handleSubmit} buttonText="Update" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}