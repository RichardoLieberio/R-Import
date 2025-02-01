import './globals.css';

export const metadata = {
    title: 'R Import - Instagram, Google My Business, and Manual',
    description: 'R Import is a case study and demonstration app that showcases how to import images seamlessly from Instagram, Google My Business, or manually. Designed for developers, the app is open-source, does not store client data, and serves as a reference for implementing image import functionality in various projects.',
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className="min-w-80 p-8 text-base text-slate-950 bg-slate-100">
                { children }
            </body>
        </html>
    );
}