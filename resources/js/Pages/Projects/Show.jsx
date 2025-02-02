import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show() {
    const { project } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={project.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{project.name}</h3>
                        <p className="text-gray-800 dark:text-gray-200">{project.description}</p>
                        <p className="text-gray-800 dark:text-gray-200">Enterprise: {project.enterprise.name}</p>
                        <Link href={`/projects/${project.id}/edit`} className="text-blue-500 dark:text-blue-300">Edit</Link>
                        <form action={`/projects/${project.id}`} method="POST" style={{ display: 'inline' }}>
                            <input type="hidden" name="_method" value="DELETE" />
                            <button type="submit" className="text-red-500 dark:text-red-300 ml-2">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}