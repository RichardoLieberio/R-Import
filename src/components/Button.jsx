'use client';

export default function Button({ children, ...props }) {
    return (
        <button {...props} className="px-8 py-2 text-white bg-green-800 rounded-md hover:bg-green-600">
            { children }
        </button>
    );
}