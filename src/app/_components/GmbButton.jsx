'use client';

import Button from '@components/Button';

export default function GmbButton() {
    function clickHandler() {
        console.log('Google My Business');
    }

    return (
        <Button onClick={clickHandler}>Google My Business</Button>
    );
}