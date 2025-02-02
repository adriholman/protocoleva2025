import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function Form({ data, setData, errors, projects, handleSubmit, buttonText }) {
    const [questions, setQuestions] = useState(data.general_questions || []);

    useEffect(() => {
        setData('general_questions', questions);
    }, [questions]);

    const addQuestion = () => {
        setQuestions([...questions, { name: '', options: '' }]);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl mx-auto">
            {/* Nombre */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Nombre</label>
                <input 
                    type="text" 
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={data.name} 
                    onChange={(e) => setData('name', e.target.value)} 
                />
                {errors.name && <div className="text-red-500 mt-1">{errors.name}</div>}
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Descripción</label>
                <textarea 
                    placeholder="Ejemplo: Este test mide habilidades cognitivas..." 
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={data.description} 
                    onChange={(e) => setData('description', e.target.value)} 
                ></textarea>
                {errors.description && <div className="text-red-500 mt-1">{errors.description}</div>}
            </div>

            {/* Valores */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Valores</label>
                <textarea 
                    placeholder="Ejemplo: Razonamiento, Memoria, Atención..." 
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={data.values} 
                    onChange={(e) => setData('values', e.target.value)} 
                ></textarea>
                {errors.values && <div className="text-red-500 mt-1">{errors.values}</div>}
            </div>

            {/* Opciones de Valores */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Opciones de Valores (separadas por comas)</label>
                <textarea 
                    placeholder="Ejemplo: Alto, Medio, Bajo..." 
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={data.value_options} 
                    onChange={(e) => setData('value_options', e.target.value)} 
                ></textarea>
                {errors.value_options && <div className="text-red-500 mt-1">{errors.value_options}</div>}
            </div>

            {/* Proyecto */}
            <div>
                <label className="block text-gray-700 dark:text-gray-300">Proyecto</label>
                <select 
                    className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                    value={data.project_id} 
                    onChange={(e) => setData('project_id', e.target.value)}
                >
                    <option value="">Seleccionar Proyecto</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select>
                {errors.project_id && <div className="text-red-500 mt-1">{errors.project_id}</div>}
            </div>
            <hr className="border-gray-300 dark:border-gray-700" />    
            {/* Preguntas Generales */}
            <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-center">Preguntas Generales</h4>
                {questions.map((question, index) => (
                    <div key={index} className="border p-4 rounded-md mb-4 relative">
                        <label className="block text-gray-700 dark:text-gray-300">Pregunta</label>
                        <input 
                            type="text" 
                            placeholder="Ejemplo: ¿Cuál es tu color favorito?" 
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                            value={question.name} 
                            onChange={(e) => handleQuestionChange(index, 'name', e.target.value)}
                        />
                        <label className="block text-gray-700 dark:text-gray-300 mt-2">Opciones (separadas por comas)</label>
                        <textarea 
                            placeholder="Ejemplo: Rojo, Azul, Verde..." 
                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                            value={question.options} 
                            onChange={(e) => handleQuestionChange(index, 'options', e.target.value)}
                        ></textarea>

                        {/* Botón de Eliminar */}
                        <button 
                            type="button" 
                            className="text-red-500 hover:text-red-700 transition mt-3 flex items-center gap-2"
                            onClick={() => removeQuestion(index)}
                        >
                            <FaTrash size={16} /> Eliminar
                        </button>
                    </div>
                ))}

                {/* Botón de Agregar Pregunta (Centrado) */}
                <div className="flex justify-center mt-6">
                    <button 
                        type="button" 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                        onClick={addQuestion}
                    >
                        <FaPlus /> Añadir Pregunta
                    </button>
                </div>
            </div>

            {/* Botón de Enviar */}
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
            >
                {buttonText}
            </button>
        </form>
    );
}
