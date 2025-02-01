import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ProjectsIndex({ projects }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">List of Projects</h3>
                        <Link href="/projects/create" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">Create Project</Link>

                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-4">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Name</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Description</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Enterprise</th>
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Test Limit</th> {/* Add this line */}
                                    <th className="border p-2 text-gray-800 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.length > 0 ? projects.map((project) => (
                                    <tr key={project.id} className="text-center bg-white dark:bg-gray-800">
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.description}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.enterprise.name}</td>
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">{project.test_limit}</td> {/* Add this line */}
                                        <td className="border p-2 text-gray-800 dark:text-gray-200">
                                            <Link href={`/projects/${project.id}/edit`} className="text-blue-500 dark:text-blue-300">Edit</Link>
                                            <form action={`/projects/${project.id}`} method="POST" style={{ display: 'inline' }}>
                                                <input type="hidden" name="_method" value="DELETE" />
                                                <button type="submit" className="text-red-500 dark:text-red-300 ml-2">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="border p-2 text-gray-800 dark:text-gray-200">No projects found.</td> {/* Update colSpan */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}