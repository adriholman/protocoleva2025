import React from 'react';

export default function Form({ data, setData, errors, handleSubmit, buttonText }) {
    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                {/* Nombre */}
                <div>
                    <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Ejemplo: Evaluación Personal" 
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)} 
                    />
                    {errors.name && <div className="text-red-500 dark:text-red-300 mt-1">{errors.name}</div>}
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block font-medium text-gray-700 dark:text-gray-300">Descripción</label>
                    <textarea 
                        id="description" 
                        placeholder="Describe el propósito del test..." 
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        value={data.description} 
                        onChange={(e) => setData('description', e.target.value)} 
                    ></textarea>
                    {errors.description && <div className="text-red-500 dark:text-red-300 mt-1">{errors.description}</div>}
                </div>

                {/* Límite de Tests */}
                <div>
                    <label htmlFor="test_limit" className="block font-medium text-gray-700 dark:text-gray-300">Límite de Tests</label>
                    <input 
                        type="number" 
                        id="test_limit" 
                        placeholder="Ejemplo: 10" 
                        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        value={data.test_limit} 
                        onChange={(e) => setData('test_limit', e.target.value)} 
                    />
                    {errors.test_limit && <div className="text-red-500 dark:text-red-300 mt-1">{errors.test_limit}</div>}
                </div>

                {/* Botón */}
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
                >
                    {buttonText}
                </button>
            </form>
        </div>
    );
}
