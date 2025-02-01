import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Form from './Form';

export default function Edit() {
    const { project, enterprises } = usePage().props;
    const { data, setData, put, errors } = useForm({
        name: project.name,
        description: project.description,
        enterprise_id: project.enterprise_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('projects.update', project.id));
    };

    return (
        <div>
            <h1>Edit Project</h1>
            <Form data={data} setData={setData} errors={errors} enterprises={enterprises} handleSubmit={handleSubmit} buttonText="Update" />
        </div>
    );
}