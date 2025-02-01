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
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            {isEdit ? 'Edit Enterprise' : 'Create Enterprise'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
                                <input type="text" id="name" placeholder="Name" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <div className="text-red-500 dark:text-red-300">{errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
                                <input type="email" id="email" placeholder="Email" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                {errors.email && <div className="text-red-500 dark:text-red-300">{errors.email}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="nif" className="block text-gray-700 dark:text-gray-300">NIF</label>
                                <input type="text" id="nif" placeholder="NIF" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.nif} onChange={(e) => setData('nif', e.target.value)} />
                                {errors.nif && <div className="text-red-500 dark:text-red-300">{errors.nif}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 dark:text-gray-300">Description</label>
                                <textarea id="description" placeholder="Description" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.description} onChange={(e) => setData('description', e.target.value)}></textarea>
                                {errors.description && <div className="text-red-500 dark:text-red-300">{errors.description}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 dark:text-gray-300">Address</label>
                                <input type="text" id="address" placeholder="Address" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                {errors.address && <div className="text-red-500 dark:text-red-300">{errors.address}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300">Phone</label>
                                <input type="text" id="phone" placeholder="Phone" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                {errors.phone && <div className="text-red-500 dark:text-red-300">{errors.phone}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="website" className="block text-gray-700 dark:text-gray-300">Website</label>
                                <input type="text" id="website" placeholder="Website" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                    value={data.website} onChange={(e) => setData('website', e.target.value)} />
                                {errors.website && <div className="text-red-500 dark:text-red-300">{errors.website}</div>}
                            </div>

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEdit ? 'Update' : 'Create'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}