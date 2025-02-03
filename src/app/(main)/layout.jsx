import MediumLayout from '@components/MediumLayout';
import Link from '@components/Link';
import ActionButtons from './_components/ActionButtons';

export default function MainLayout({ children }) {
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
                    <ActionButtons />
                </div>
            </header>
            <main className="mt-12">
                { children }
            </main>
        </MediumLayout>
    );
}