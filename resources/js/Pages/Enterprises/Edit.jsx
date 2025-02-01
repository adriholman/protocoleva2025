
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EnterpriseForm({ enterprise = null }) {
    const isEdit = !!enterprise;
    const { data, setData, post, put, errors } = useForm(
        enterprise || { name: '', email: '', nif: '' }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/enterprises/${enterprise.id}`);
        } else {
            post('/enterprises');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? 'Edit Enterprise' : 'Create Enterprise'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            {isEdit ? 'Edit Enterprise' : 'Create Enterprise'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Name" className="border p-2 w-full" 
                                value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}

                            <input type="email" placeholder="Email" className="border p-2 w-full mt-2" 
                                value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}

                            <input type="text" placeholder="NIF" className="border p-2 w-full mt-2" 
                                value={data.nif} onChange={(e) => setData('nif', e.target.value)} />
                            {errors.nif && <div className="text-red-500">{errors.nif}</div>}

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
                                {isEdit ? 'Update' : 'Create'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}