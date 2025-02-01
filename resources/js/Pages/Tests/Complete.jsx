import React, { useState } from 'react';
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
            <Head title={test?.name || 'Complete Test'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Complete Test: {test?.name}</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">General Questions</h4>
                            {test.general_questions.map((question, index) => (
                                <div key={question.id} className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300">{question.name}</label>
                                    <div className="mt-2">
                                        {question.options.split(',').map((option, i) => (
                                            <label key={i} className="inline-flex items-center">
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
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{option.trim()}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors[`general_answers.${index}.answer`] && <div className="text-red-500 dark:text-red-300">{errors[`general_answers.${index}.answer`]}</div>}
                                </div>
                            ))}

                            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Value Questions</h4>
                            {test.value_questions.map((question, index) => (
                                <div key={question.id} className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300">{question.name}</label>
                                    <div className="mt-2">
                                        {test.value_options.split(',').map((option, i) => (
                                            <label key={i} className="inline-flex items-center">
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
                                                <span className="ml-2 text-gray-700 dark:text-gray-300">{option.trim()}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors[`value_answers.${index}.answer`] && <div className="text-red-500 dark:text-red-300">{errors[`value_answers.${index}.answer`]}</div>}
                                </div>
                            ))}

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={processing}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}