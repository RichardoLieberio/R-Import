'use client';

export default function Input({ ...props }) {
    return (
        <input {...props} className="w-full max-w-96 px-3 py-2 border rounded-md" />
    );
}