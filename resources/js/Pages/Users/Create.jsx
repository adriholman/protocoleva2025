import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Create({ roles, enterprises }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        enterprise_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nuevo Usuario" />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 w-full max-w-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">Nuevo Usuario</h3>
                    <Form 
                        data={data} 
                        setData={setData} 
                        errors={errors} 
                        handleSubmit={handleSubmit} 
                        buttonText="Agregar" 
                        roles={roles} 
                        enterprises={enterprises} 
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
