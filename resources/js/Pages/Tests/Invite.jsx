import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Invite() {
    const { test, users } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        user_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tests.sendInvites', test.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Invite Users to ${test.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Invite Users to {test.name}</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300">Select Users</label>
                                <select
                                    multiple
                                    className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    value={data.user_ids}
                                    onChange={(e) => setData('user_ids', [...e.target.selectedOptions].map(option => option.value))}
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                {errors.user_ids && <div className="text-red-500 dark:text-red-300">{errors.user_ids}</div>}
                            </div>

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={processing}>Send Invites</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}