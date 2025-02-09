import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Edit() {
    const { test, projects } = usePage().props;
    const { data, setData, patch, errors } = useForm({
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
        patch(route('tests.update', test.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Prueba" />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-4 w-full max-w-lg">
                    <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">Editar Prueba</h3>
                    <Form data={data} setData={setData} errors={errors} projects={projects} handleSubmit={handleSubmit} buttonText="Actualizar Test" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
