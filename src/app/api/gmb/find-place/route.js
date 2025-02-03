export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const address = searchParams.get('address');

    const uri = process.env.NEXT_PUBLIC_GOOGLE_FIND_PLACE_URI
        .replace('<ADDRESS>', address)
        .replace('<GOOGLE_MAP_API_KEY>', process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    const response = await fetch(uri);
    const data = await response.json();

    return Response.json({ data }, { status: 200 });
}