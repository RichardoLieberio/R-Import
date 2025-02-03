'use client';

import Button from '@components/Button';

export default function InstagramButton() {
    function clickHandler() {
        const uri = process.env.NEXT_PUBLIC_INSTAGRAM_OAUTH_URI
            .replace('<INSTAGRAM_CLIENT_ID>', process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID)
            .replace('<INSTAGRAM_REDIRECT_URI>', process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI)
        location.href = uri;
    }

    return (
        <Button onClick={clickHandler}>Instagram</Button>
    );
}