'use client';

import { useRouter } from 'next/navigation';
import Button from '@components/Button';

export default function GmbButton() {
    const router = useRouter();

    function clickHandler() {
        router.push('/gmb');
    }

    return (
        <Button onClick={clickHandler}>Google My Business</Button>
    );
}