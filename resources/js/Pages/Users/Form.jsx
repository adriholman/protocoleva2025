import React from "react";

export default function Form({
    data,
    setData,
    errors,
    handleSubmit,
    buttonText,
    roles,
    enterprises,
}) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && (
                    <div className="text-red-500 dark:text-red-300 mt-1">
                        {errors.name}
                    </div>
                )}
            </div>

            {/* Email */}
            <div>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                    <div className="text-red-500 dark:text-red-300 mt-1">
                        {errors.email}
                    </div>
                )}
            </div>

            {/* Contraseña */}
            <div>
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                {errors.password && (
                    <div className="text-red-500 dark:text-red-300 mt-1">
                        {errors.password}
                    </div>
                )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />
                {errors.password_confirmation && (
                    <div className="text-red-500 dark:text-red-300 mt-1">
                        {errors.password_confirmation}
                    </div>
                )}
            </div>

            {/* Rol */}
            <div>
                <select
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.role_id}
                    onChange={(e) => setData("role_id", e.target.value)}
                >
                    <option value="">Seleccionar Rol</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.roleDisplayName}
                        </option>
                    ))}
                </select>
                {errors.role_id && (
                    <div className="text-red-500 dark:text-red-300 mt-1">
                        {errors.role_id}
                    </div>
                )}
            </div>

            {/* Empresa */}
            <div>
                <select
                    className="border rounded-lg p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.enterprise_id}
                    onChange={(e) => setData("enterprise_id", e.target.value)}
                >
                    <option value="">Seleccionar Empresa</option>
                    {enterprises.map((enterprise) => (
                        <option key={enterprise.id} value={enterprise.id}>
                            {enterprise.name}
                        </option>
                    ))}
                </select>
                {errors.enterprise_id && (
                    <div className="text-red-500 dark:text-red-300 mt-1">
                        {errors.enterprise_id}
                    </div>
                )}
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full"
            >
                {buttonText}
            </button>
        </form>
    );
}
