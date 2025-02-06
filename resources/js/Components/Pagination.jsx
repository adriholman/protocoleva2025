import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="mt-4 flex justify-center space-x-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url}
                    className={`px-3 py-1 border rounded-md ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}