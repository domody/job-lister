import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

export default function PublicTopbar() {
    const { auth } = usePage().props;


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-14 items-center px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex aspect-square size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                        <AppLogoIcon className="size-4 text-white dark:text-black" />
                    </div>
                    <span className="text-sm font-semibold">Job Lister</span>
                </Link>
                {/* Right Aligned content */}
                <div className="ml-auto flex items-center justify-end gap-2">
                    {auth.user && auth.user.is_admin ? (
                            <Button size={'sm'} variant={'secondary'} asChild>
                                <Link href={'/admin/dashboard'}>Dashboard</Link>
                            </Button>
                    ) : (
                        <Button size={'sm'} variant={'secondary'} asChild>
                            <Link href={'/login'}>Admin Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
