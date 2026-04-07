import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

export default function PublicTopbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4">
                <Link href="/jobs" className="flex items-center gap-2">
                    <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                        <AppLogoIcon className="size-4 text-white dark:text-black" />
                    </div>
                    <span className="font-semibold text-sm">Job Lister</span>
                </Link>
            </div>
        </header>
    );
}
