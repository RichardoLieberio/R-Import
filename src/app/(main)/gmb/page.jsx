'use client';

import { useState } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import ViewImages from '../_components/ViewImages';

export default function GmbPage() {
    const [ images, setImages ] = useState(null);
    const [ address, setAddress ] = useState('');
    const [ isSearching, setIsSearching ] = useState(false);
    const [ error, setError ] = useState(null);

    async function search() {
        if (!isSearching) {
            setIsSearching(true);
            setImages(null);
            setError(null);

            try {
                const encodedAddress = encodeURIComponent(address);

                const response = await fetch(`/api/gmb/find-place?address=${encodedAddress}`);
                const data = await response.json();

                if (data.data.status === 'OK') {
                    let allImages = [];
                    const candidates = data.data?.candidates ?? [];

                    for (const { place_id } of candidates) {
                        if (allImages.length >= +process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) break;

                        const response = await fetch(`/api/gmb/detail?placeId=${place_id}`)
                        const data = await response.json();

                        console.log(data.data.result);

                        const photos = data.data?.result?.photos ?? [];
                        const photoObj = photos.map(({ photo_reference }) => ({
                            id: photo_reference,
                            media: process.env.NEXT_PUBLIC_GOOGLE_PLACE_PHOTO_URI
                                .replace('<PHOTO_REFERENCE>', photo_reference)
                                .replace('<GOOGLE_MAP_API_KEY>', process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY),
                        }));

                        allImages = allImages.concat(photoObj).slice(0, +process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH);
                    }

                    setImages(allImages);
                } else if (data.data.status === 'ZERO_RESULTS' || data.data.status === 'NOT_FOUND') {
                    setImages([]);
                } else if (data.data.status === 'INVALID_REQUEST') {
                    setError('Invalid request');
                } else if (data.data.status === 'OVER_QUERY_LIMIT') {
                    setError('Please try again later');
                } else if (data.data.status === 'REQUEST_DENIED') {
                    setError('Missing api key');
                } else {
                    throw new Error();
                }
            } catch (error) {
                setError('Unknown error occurs');
            } finally {
                setIsSearching(false);
            }
        }
    }

    return (
        <>
            <div className="flex items-center justify-center gap-4">
                <Input type="text" placeholder="Search your address..." value={address} onChange={(e) => setAddress(e.target.value)} />
                <Button onClick={search}>Search</Button>
            </div>
            <div className="mt-8">
                <ViewImages error={error} images={images} />
            </div>
        </>
    );
}