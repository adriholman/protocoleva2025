import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
    const { enterprises } = usePage().props;
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        enterprise_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Project" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Create Project</h3>
                        <Form data={data} setData={setData} errors={errors} enterprises={enterprises} handleSubmit={handleSubmit} buttonText="Create" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}