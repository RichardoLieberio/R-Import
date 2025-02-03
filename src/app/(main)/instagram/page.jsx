import Error from '@components/Error';
import ViewImages from '../_components/ViewImages';

export default async function InstagramPage({ searchParams }) {
    const { code } = await searchParams;

    let images = null;
    let error = null;

    if (code) {
        const response = await fetch(process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN_URI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI,
                code,
            }),
        });

        const data = await response.json();
        const { user_id: userId, access_token: accessToken } = data;

        if (userId && accessToken) {
            const uri = process.env.NEXT_PUBLIC_INSTAGRAM_MEDIA_URI
                .replace('<INSTAGRAM_USER_ID>', userId)
                .replace('<INSTAGRAM_ACCESS_TOKEN>', accessToken);

            const response = await fetch(uri)
            const rawData = await response.json();

            if (rawData.error) {
                error = 'Please try again later';
            } else {
                images = [];
                let data = rawData.data;
                let next = rawData.paging.next;

                do {
                    for (const { children } of data) {
                        if (images.length >= +process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) break;
                        for (const { id, media_url: media } of children.data) {
                            if (images.length >= +process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) break;
                            images.push({ id, media });
                        }
                    }

                    if (next && images.length < +process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) {
                        try {
                            const response = await fetch(next);
                            const rawData = await response.json();

                            data = rawData.data;
                            next = rawData.paging.next;
                        } catch (err) {
                            error = 'Failed to get images';
                            break;
                        }
                    }
                } while (next && images.length < +process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH)
            }
        } else {
            error = 'Failed to authenticate';
        }
    }

    return (
        <ViewImages error={error} images={images} />
    );
}