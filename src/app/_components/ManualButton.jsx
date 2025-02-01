'use client';

import Button from '@components/Button';

export default function ManualButton() {
    function clickHandler() {
        console.log('Manual');
    }

    return (
        <Button onClick={clickHandler}>Manual</Button>
    );
}