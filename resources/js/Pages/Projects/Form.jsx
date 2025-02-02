import React from 'react';

export default function Form({ data, setData, errors, enterprises, handleSubmit, buttonText }) {
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
                <label htmlFor="enterprise_id" className="block text-gray-700 dark:text-gray-300">Enterprise</label>
                <select id="enterprise_id" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.enterprise_id} onChange={(e) => setData('enterprise_id', e.target.value)}>
                    <option value="">Select Enterprise</option>
                    {enterprises.map((enterprise) => (
                        <option key={enterprise.id} value={enterprise.id}>{enterprise.name}</option>
                    ))}
                </select>
                {errors.enterprise_id && <div className="text-red-500 dark:text-red-300">{errors.enterprise_id}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="test_limit" className="block text-gray-700 dark:text-gray-300">Test Limit</label>
                <input type="number" id="test_limit" placeholder="Test Limit" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                    value={data.test_limit} onChange={(e) => setData('test_limit', e.target.value)} />
                {errors.test_limit && <div className="text-red-500 dark:text-red-300">{errors.test_limit}</div>}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{buttonText}</button>
        </form>
    );
}