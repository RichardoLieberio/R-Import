import MediumLayout from '@components/MediumLayout';
import Link from '@components/Link';
import InstagramButton from './_components/InstagramButton';
import GmbButton from './_components/GmbButton';
import ManualButton from './_components/ManualButton';
import InstagramView from './_components/InstagramView';

export default async function RootPage({ searchParams }) {
    const { code } = await searchParams;
    let display = null;
    let rawData = null;

    if (code) {
        const tokenRes = await fetch(process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN_URI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: process.env.NEXT_PUBLIC_APP_URI,
                code,
            }),
        });

        const tokenData = await tokenRes.json();
        const { user_id: userId, access_token: accessToken } = tokenData;

        if (!userId || !accessToken) throw new Error('Failed to get User Id and Access Token!');

        const uri = process.env.NEXT_PUBLIC_INSTAGRAM_MEDIA_URI
            .replace('<INSTAGRAM_USER_ID>', userId)
            .replace('<INSTAGRAM_ACCESS_TOKEN>', accessToken);

        const res = await fetch(uri)
        rawData = await res.json();

        if (rawData.error) throw new Error(rawData.error.message);

        display = 'instagram';
    }

    return (
        <MediumLayout>
            <Link href="/privacy-policy">Privacy policy</Link>
            <header className="mt-8 w-fit mx-auto">
                <div className="flex items-center gap-4">
                    <div className="w-full h-px bg-slate-900"></div>
                    <span className="whitespace-nowrap">Import images</span>
                    <div className="w-full h-px bg-slate-900"></div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InstagramButton />
                    <GmbButton />
                    <ManualButton />
                </div>
            </header>
            <main className="mt-12">
                { display === 'instagram' &&  <InstagramView rawData={rawData} /> }
            </main>
        </MediumLayout>
    );
}