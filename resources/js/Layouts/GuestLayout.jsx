import React, { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function GuestLayout({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDarkMode ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div
            className={`flex min-h-screen flex-col items-center ${
                theme === "dark" ? "bg-gray-900" : "bg-gray-100"
            } pt-6 sm:justify-center sm:pt-0`}
        >
            <div className="absolute top-4 right-4">
            <button
                                onClick={toggleTheme}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                            >
                                {theme === 'light' ? (
                                    <FaMoon className="text-gray-500 hover:text-gray-600" />
                                ) : (
                                    <FaSun className="text-yellow-500 hover:text-yellow-600" />
                                )}
                            </button>
            </div>
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500 dark:text-gray-200" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
