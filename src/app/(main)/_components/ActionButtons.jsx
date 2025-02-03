'use client';

import { useRouter } from 'next/navigation';
import Button from '@components/Button';

export default function ActionButtons() {
    const router = useRouter();

    function instagramHandler() {
        const uri = process.env.NEXT_PUBLIC_INSTAGRAM_OAUTH_URI
            .replace('<INSTAGRAM_CLIENT_ID>', process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID)
            .replace('<INSTAGRAM_REDIRECT_URI>', process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI)
        location.href = uri;
    }

    function gmbHandler() {
        router.push('/gmb');
    }

    function manualHandler() {
        router.push('/manual');
    }

    return (
        <>
            <Button onClick={instagramHandler}>Instagram</Button>
            <Button onClick={gmbHandler}>Google My Business</Button>
            <Button onClick={manualHandler}>Manual</Button>
        </>
    );
}