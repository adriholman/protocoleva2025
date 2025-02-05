import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        test_limit: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Crear Proyecto" />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-4 w-full max-w-lg">
                    <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">Crear Proyecto</h3>
                    <Form data={data} setData={setData} errors={errors} handleSubmit={handleSubmit} buttonText="Agregar" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
