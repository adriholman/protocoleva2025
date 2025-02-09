import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Edit() {
    const { project } = usePage().props;
    const { data, setData, patch, errors } = useForm({
        name: project.name,
        description: project.description,
        test_limit: project.test_limit,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('projects.update', project));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Proyecto" />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-4 w-full max-w-lg">
                    <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">Editar Proyecto</h3>
                    <Form data={data} setData={setData} errors={errors} handleSubmit={handleSubmit} buttonText="Actualizar" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
