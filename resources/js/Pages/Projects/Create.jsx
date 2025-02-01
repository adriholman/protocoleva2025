import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Form from './Form';

export default function Create() {
    const { enterprises } = usePage().props;
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        enterprise_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    return (
        <div>
            <h1>Create Project</h1>
            <Form data={data} setData={setData} errors={errors} enterprises={enterprises} handleSubmit={handleSubmit} buttonText="Create" />
        </div>
    );
}