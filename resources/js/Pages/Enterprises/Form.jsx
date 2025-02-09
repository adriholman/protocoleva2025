import React from 'react';

export default function Form({ data, setData, errors, handleSubmit, buttonText }) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.name} 
                    onChange={(e) => setData('name', e.target.value)} 
                />
                {errors.name && <div className="text-red-500 dark:text-red-300 mt-1">{errors.name}</div>}
            </div>

            {/* Email */}
            <div>
                <input 
                    type="email" 
                    placeholder="Correo Electrónico" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.email} 
                    onChange={(e) => setData('email', e.target.value)} 
                />
                {errors.email && <div className="text-red-500 dark:text-red-300 mt-1">{errors.email}</div>}
            </div>

            {/* NIF */}
            <div>
                <input 
                    type="text" 
                    placeholder="NIF" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.nif} 
                    onChange={(e) => setData('nif', e.target.value)} 
                />
                {errors.nif && <div className="text-red-500 dark:text-red-300 mt-1">{errors.nif}</div>}
            </div>

            {/* Descripción */}
            <div>
                <textarea 
                    placeholder="Descripción" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.description} 
                    onChange={(e) => setData('description', e.target.value)} 
                ></textarea>
                {errors.description && <div className="text-red-500 dark:text-red-300 mt-1">{errors.description}</div>}
            </div>

            {/* Dirección */}
            <div>
                <input 
                    type="text" 
                    placeholder="Dirección" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.address} 
                    onChange={(e) => setData('address', e.target.value)} 
                />
                {errors.address && <div className="text-red-500 dark:text-red-300 mt-1">{errors.address}</div>}
            </div>

            {/* Teléfono */}
            <div>
                <input 
                    type="text" 
                    placeholder="Teléfono" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.phone} 
                    onChange={(e) => setData('phone', e.target.value)} 
                />
                {errors.phone && <div className="text-red-500 dark:text-red-300 mt-1">{errors.phone}</div>}
            </div>

            {/* Sitio Web */}
            <div>
                <input 
                    type="text" 
                    placeholder="Sitio Web" 
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.website} 
                    onChange={(e) => setData('website', e.target.value)} 
                />
                {errors.website && <div className="text-red-500 dark:text-red-300 mt-1">{errors.website}</div>}
            </div>

            {/* Botón */}
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
            >
                {buttonText}
            </button>
        </form>
    );
}