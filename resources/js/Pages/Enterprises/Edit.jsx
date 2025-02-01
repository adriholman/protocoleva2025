import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EnterpriseForm({ enterprise = null }) {
    const isEdit = !!enterprise;
    const { data, setData, post, put, errors } = useForm(
        enterprise || { name: '', email: '', nif: '', description: '', address: '', phone: '', website: '' }
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

                            <input type="text" placeholder="Description" className="border p-2 w-full mt-2" 
                                value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            {errors.description && <div className="text-red-500">{errors.description}</div>}

                            <input type="text" placeholder="Address" className="border p-2 w-full mt-2" 
                                value={data.address} onChange={(e) => setData('address', e.target.value)} />
                            {errors.address && <div className="text-red-500">{errors.address}</div>}

                            <input type="text" placeholder="Phone" className="border p-2 w-full mt-2" 
                                value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                            {errors.phone && <div className="text-red-500">{errors.phone}</div>}

                            <input type="text" placeholder="Website" className="border p-2 w-full mt-2" 
                                value={data.website} onChange={(e) => setData('website', e.target.value)} />
                            {errors.website && <div className="text-red-500">{errors.website}</div>}

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