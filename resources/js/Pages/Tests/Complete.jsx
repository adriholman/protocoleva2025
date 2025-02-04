import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Complete() {
    const { test } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        general_answers: test.general_questions.map(question => ({ question_id: question.id, answer: '' })),
        value_answers: test.value_questions.map(question => ({ question_id: question.id, answer: '' })),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tests.submit', test.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={test?.name || 'Realizar Test'} />
            <div className="py-12 flex justify-center">
                <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 w-full max-w-2xl">
                    <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
                        Realizar Test: {test?.name}
                    </h3>

                    {/* Descripción del Test */}
                    <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Instrucciones</h4>
                        <p className="text-gray-800 dark:text-gray-200 mt-2">{test?.description || "Sin descripción disponible"}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Preguntas Generales */}
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preguntas Generales</h4>
                        {test.general_questions.map((question, index) => (
                            <div key={question.id} className="mb-6">
                                <hr className="border-gray-400 dark:border-gray-600 mb-4" />
                                <label className="block text-gray-700 dark:text-gray-300 font-medium">{question.name}</label>
                                <div className="mt-2 space-y-2">
                                    {question.options.split(',').map((option, i) => (
                                        <label key={i} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`general_answers[${index}].answer`}
                                                value={option.trim()}
                                                checked={data.general_answers[index].answer === option.trim()}
                                                onChange={(e) => {
                                                    const newGeneralAnswers = [...data.general_answers];
                                                    newGeneralAnswers[index].answer = e.target.value;
                                                    setData('general_answers', newGeneralAnswers);
                                                }}
                                                className="form-radio text-blue-600 dark:text-blue-400"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">{option.trim()}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors[`general_answers.${index}.answer`] && <div className="text-red-500 dark:text-red-300 mt-1">{errors[`general_answers.${index}.answer`]}</div>}
                            </div>
                        ))}

                        {/* Preguntas de Valor */}
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preguntas de Valor</h4>
                        {test.value_questions.map((question, index) => (
                            <div key={question.id} className="mb-6">
                                <hr className="border-gray-400 dark:border-gray-600 mb-4" />
                                <label className="block text-gray-700 dark:text-gray-300 font-medium">{question.name}</label>
                                <div className="mt-2 space-y-2">
                                    {test.value_options.split(',').map((option, i) => (
                                        <label key={i} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name={`value_answers[${index}].answer`}
                                                value={option.trim()}
                                                checked={data.value_answers[index].answer === option.trim()}
                                                onChange={(e) => {
                                                    const newValueAnswers = [...data.value_answers];
                                                    newValueAnswers[index].answer = e.target.value;
                                                    setData('value_answers', newValueAnswers);
                                                }}
                                                className="form-radio text-blue-600 dark:text-blue-400"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">{option.trim()}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors[`value_answers.${index}.answer`] && <div className="text-red-500 dark:text-red-300 mt-1">{errors[`value_answers.${index}.answer`]}</div>}
                            </div>
                        ))}

                        {/* Botón de Envío */}
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
                            disabled={processing}
                        >
                            Completar
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
