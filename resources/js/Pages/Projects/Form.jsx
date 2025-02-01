import React from 'react';

export default function Form({ data, setData, errors, enterprises, handleSubmit, buttonText }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className="form-control" value={data.name} onChange={e => setData('name', e.target.value)} required />
                {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" className="form-control" value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                {errors.description && <div className="text-danger">{errors.description}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="enterprise_id">Enterprise</label>
                <select name="enterprise_id" id="enterprise_id" className="form-control" value={data.enterprise_id} onChange={e => setData('enterprise_id', e.target.value)} required>
                    {enterprises.map(enterprise => (
                        <option key={enterprise.id} value={enterprise.id}>{enterprise.name}</option>
                    ))}
                </select>
                {errors.enterprise_id && <div className="text-danger">{errors.enterprise_id}</div>}
            </div>
            <button type="submit" className="btn btn-primary">{buttonText}</button>
        </form>
    );
}