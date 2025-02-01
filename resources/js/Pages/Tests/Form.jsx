import React, { useState, useEffect } from 'react';

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

            <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">General Questions</h4>
                {questions.map((question, index) => (
                    <div key={index} className="mb-4 border p-4 rounded-md dark:bg-gray-700">
                        <div className="mb-2">
                            <label htmlFor={`question_name_${index}`} className="block text-gray-700 dark:text-gray-300">Question Name</label>
                            <input type="text" id={`question_name_${index}`} placeholder="Question Name" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                value={question.name} onChange={(e) => handleQuestionChange(index, 'name', e.target.value)} />
                            {errors[`general_questions.${index}.name`] && <div className="text-red-500 dark:text-red-300">{errors[`general_questions.${index}.name`]}</div>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor={`question_options_${index}`} className="block text-gray-700 dark:text-gray-300">Options</label>
                            <textarea id={`question_options_${index}`} placeholder="Options" className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" 
                                value={question.options} onChange={(e) => handleQuestionChange(index, 'options', e.target.value)}></textarea>
                            {errors[`general_questions.${index}.options`] && <div className="text-red-500 dark:text-red-300">{errors[`general_questions.${index}.options`]}</div>}
                        </div>
                        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => removeQuestion(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={addQuestion}>Add Question</button>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{buttonText}</button>
        </form>
    );
}