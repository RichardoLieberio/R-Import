export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const placeId = searchParams.get('placeId');

    const uri = process.env.NEXT_PUBLIC_GOOGLE_DETAIL_URI
        .replace('<PLACE_ID>', placeId)
        .replace('<GOOGLE_MAP_API_KEY>', process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    const response = await fetch(uri);
    const data = await response.json();

    return Response.json({ data }, { status: 200 });
}