import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';
import { BriefcaseIcon, PlusIcon } from 'lucide-react';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'freelance'] as const;

type Stats = {
    total: number;
    by_type: Record<string, number>;
    recent: JobListing[];
};

export default function AdminDashboard({ stats }: { stats: Stats }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Overview of your job listings</p>
                    </div>
                    <Button size="sm" asChild>
                        <Link href="/admin/jobs/create">
                            <PlusIcon data-icon="inline-start" />
                            New Listing
                        </Link>
                    </Button>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                    <div className="flex flex-col gap-1 rounded-lg border p-4">
                        <p className="text-xs text-muted-foreground">Total Listings</p>
                        <p className="text-3xl font-bold">{stats.total}</p>
                    </div>
                    {JOB_TYPES.map((type) => (
                        <div key={type} className="flex flex-col gap-1 rounded-lg border p-4">
                            <p className="text-xs capitalize text-muted-foreground">{type}</p>
                            <p className="text-3xl font-bold">{stats.by_type[type] ?? 0}</p>
                        </div>
                    ))}
                </div>

                <Separator />

                {/* Recent listings */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium">Recent Listings</h2>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/jobs">View all</Link>
                        </Button>
                    </div>

                    {stats.recent.length > 0 ? (
                        <div className="flex flex-col divide-y rounded-lg border">
                            {stats.recent.map((job) => (
                                <div key={job.id} className="flex items-center justify-between px-4 py-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">{job.title}</p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {job.company} · {job.location}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex shrink-0 items-center gap-2">
                                        <Badge variant="secondary" className="capitalize">
                                            {job.type}
                                        </Badge>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/jobs/${job.id}/edit`}>Edit</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 rounded-lg border py-10 text-center">
                            <BriefcaseIcon className="size-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">No listings yet</p>
                            <Button size="sm" asChild>
                                <Link href="/admin/jobs/create">Create your first listing</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
    ],
};
