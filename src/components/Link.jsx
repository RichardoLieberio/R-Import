import NextLink from 'next/link';

export default function Link({ children, ...props }) {
    return (
        <NextLink {...props} className="text-blue-800 hover:underline">
            { children }
        </NextLink>
    );
}