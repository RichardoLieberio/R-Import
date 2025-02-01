'use client';

import MediumLayout from "@components/MediumLayout";

export default function RootError({ error }) {
    return (
        <MediumLayout>
            <div className="mx-auto w-fit text-red-600">
                <h1 className="text-3xl font-semibold">Error</h1>
                <p>{ error.message }</p>
            </div>
        </MediumLayout>
    );
}