import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { project } = usePage().props;

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p>Enterprise: {project.enterprise.name}</p>
            <a href={route('projects.edit', project.id)} className="btn btn-warning">Edit</a>
            <form action={route('projects.destroy', project.id)} method="POST" style={{ display: 'inline' }}>
                <input type="hidden" name="_method" value="DELETE" />
                <button type="submit" className="btn btn-danger">Delete</button>
            </form>
        </div>
    );
}