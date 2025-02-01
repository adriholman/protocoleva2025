import React from 'react';

export default function Form({ data, setData, errors, projects, handleSubmit, buttonText }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
                <input type="text" id="name" placeholder="Name" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <div className="text-red-500 dark:text-red-300">{errors.name}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-300">Description</label>
                <textarea id="description" placeholder="Description" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.description} onChange={(e) => setData('description', e.target.value)}></textarea>
                {errors.description && <div className="text-red-500 dark:text-red-300">{errors.description}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="values" className="block text-gray-700 dark:text-gray-300">Values</label>
                <textarea id="values" placeholder="Values" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.values} onChange={(e) => setData('values', e.target.value)}></textarea>
                {errors.values && <div className="text-red-500 dark:text-red-300">{errors.values}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="value_options" className="block text-gray-700 dark:text-gray-300">Value Options</label>
                <textarea id="value_options" placeholder="Value Options" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.value_options} onChange={(e) => setData('value_options', e.target.value)}></textarea>
                {errors.value_options && <div className="text-red-500 dark:text-red-300">{errors.value_options}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="project_id" className="block text-gray-700 dark:text-gray-300">Project</label>
                <select id="project_id" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.project_id} onChange={(e) => setData('project_id', e.target.value)}>
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
                {errors.project_id && <div className="text-red-500 dark:text-red-300">{errors.project_id}</div>}
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">{buttonText}</button>
        </form>
    );
}