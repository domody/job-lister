import PublicTopbar from '@/layouts/public/public-topbar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicTopbar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
