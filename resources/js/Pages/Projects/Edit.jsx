import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Edit() {
    const { project, enterprises } = usePage().props;
    const { data, setData, put, errors } = useForm({
        name: project.name,
        description: project.description,
        enterprise_id: project.enterprise_id,
        test_limit: project.test_limit,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Project" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Edit Project</h3>
                        <Form data={data} setData={setData} errors={errors} enterprises={enterprises} handleSubmit={handleSubmit} buttonText="Update" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}