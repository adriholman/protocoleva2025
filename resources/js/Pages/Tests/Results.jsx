// In resources/js/Pages/Tests/Results.jsx
import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Function to generate random colors
const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
    }
    return colors;
};

export default function Results() {
    const { test } = usePage().props;
    const [generalData, setGeneralData] = useState([]);
    const [valueData, setValueData] = useState([]);

    useEffect(() => {
        if (!test || !test.general_questions || !test.value_questions) {
            console.log('Test data is missing:', test);
            return;
        }

        // Process general answers
        const generalAnswers = test.general_questions.reduce((acc, question) => {
            if (!question.answers) return acc;
            question.answers.forEach(answer => {
                if (!acc[question.name]) {
                    acc[question.name] = {};
                }
                if (!acc[question.name][answer.answer]) {
                    acc[question.name][answer.answer] = { count: 0, users: [] };
                }
                acc[question.name][answer.answer].count += 1;
                acc[question.name][answer.answer].users.push(answer.user_id); // Assuming answer has user_id
            });
            return acc;
        }, {});

        // Prepare data for general charts
        const generalData = Object.keys(generalAnswers).map((question, index) => {
            const labels = Object.keys(generalAnswers[question]);
            const values = labels.map(label => generalAnswers[question][label].count);
            const colors = generateColors(labels.length);
            return {
                question,
                data: {
                    labels,
                    datasets: [{
                        label: question,
                        data: values,
                        backgroundColor: colors,
                        borderColor: colors.map(color => color.replace('0.2', '1')),
                        borderWidth: 1,
                        barThickness: 20, // Adjust bar thickness
                        maxBarThickness: 20, // Adjust max bar thickness
                    }],
                },
            };
        });

        setGeneralData(generalData);

        // Process value answers
        const valueAnswers = test.value_questions.reduce((acc, question) => {
            if (!question.answers) return acc;
            question.answers.forEach(answer => {
                if (!acc[question.name]) {
                    acc[question.name] = {};
                }
                if (!acc[question.name][answer.answer]) {
                    acc[question.name][answer.answer] = { count: 0, users: [] };
                }
                acc[question.name][answer.answer].count += 1;
                acc[question.name][answer.answer].users.push(answer.user_id); // Assuming answer has user_id
            });
            return acc;
        }, {});

        // Prepare data for value charts
        const valueData = Object.keys(valueAnswers).map((question, index) => {
            const labels = Object.keys(valueAnswers[question]);
            const values = labels.map(label => valueAnswers[question][label].count);
            const colors = generateColors(labels.length);
            return {
                question,
                data: {
                    labels,
                    datasets: [{
                        label: question,
                        data: values,
                        backgroundColor: colors,
                        borderColor: colors.map(color => color.replace('0.2', '1')),
                        borderWidth: 1,
                        barThickness: 20, // Adjust bar thickness
                        maxBarThickness: 20, // Adjust max bar thickness
                    }],
                },
            };
        });

        setValueData(valueData);
    }, [test]);

    return (
        <AuthenticatedLayout>
            <Head title={`Resultados de ${test.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                            Resultados de {test.name}
                        </h3>
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preguntas Generales</h4>
                            {generalData.map((general, index) => (
                                <div key={index} className="mb-6">
                                    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-200">{general.question}</h5>
                                    <div style={{ height: '200px' }}>
                                        <Bar
                                            data={general.data}
                                            options={{
                                                indexAxis: 'y',
                                                maintainAspectRatio: false,
                                                scales: {
                                                    x: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Preguntas de Valor</h4>
                            {valueData.map((value, index) => (
                                <div key={index} className="mb-6">
                                    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-200">{value.question}</h5>
                                    <div style={{ height: '200px' }}>
                                        <Bar
                                            data={value.data}
                                            options={{
                                                indexAxis: 'y',
                                                maintainAspectRatio: false,
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}