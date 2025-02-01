import React from 'react';

export default function Form({ data, setData, errors, handleSubmit, buttonText, roles, enterprises }) {
    return (
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
                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" id="password" placeholder="Password" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    value={data.password} onChange={(e) => setData('password', e.target.value)} />
                {errors.password && <div className="text-red-500 dark:text-red-300">{errors.password}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="password_confirmation" className="block text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input type="password" id="password_confirmation" placeholder="Confirm Password" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                {errors.password_confirmation && <div className="text-red-500 dark:text-red-300">{errors.password_confirmation}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="role_id" className="block text-gray-700 dark:text-gray-300">Role</label>
                <select id="role_id" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    value={data.role_id} onChange={(e) => setData('role_id', e.target.value)}>
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
                {errors.role_id && <div className="text-red-500 dark:text-red-300">{errors.role_id}</div>}
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

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{buttonText}</button>
        </form>
    );
}