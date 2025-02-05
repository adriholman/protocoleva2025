import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

export default function Edit({ enterprise }) {
    const { data, setData, patch, errors } = useForm({
        name: enterprise.name,
        email: enterprise.email,
        nif: enterprise.nif,
        description: enterprise.description,
        address: enterprise.address,
        phone: enterprise.phone,
        website: enterprise.website,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('enterprises.update', enterprise.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar Empresa" />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 w-full max-w-2xl">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">Editar Empresa</h3>
                    <Form 
                        data={data} 
                        setData={setData} 
                        errors={errors} 
                        handleSubmit={handleSubmit} 
                        buttonText="Actualizar" 
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}