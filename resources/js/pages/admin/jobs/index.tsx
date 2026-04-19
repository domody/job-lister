import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Head, Link, router } from '@inertiajs/react';
import { BriefcaseIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';

export default function AdminJobsIndex({ jobs }: { jobs: Paginated<JobListing> }) {
    return (
        <>
            <Head title="Manage Listings" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold">Job Listings</h1>
                        <p className="text-sm text-muted-foreground">
                            {jobs.total}{' '}
                            {jobs.total === 1 ? 'listing' : 'listings'} total
                        </p>
                    </div>
                    <Button size="sm" asChild>
                        <Link href="/admin/jobs/create">
                            <PlusIcon data-icon="inline-start" />
                            New Listing
                        </Link>
                    </Button>
                </div>

                {jobs.data.length > 0 ? (
                    <div className="flex flex-col divide-y rounded-lg border">
                        {jobs.data.map((job) => (
                            <div
                                key={job.id}
                                className="flex items-center justify-between px-4 py-3"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">
                                        {job.title}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {job.company} · {job.location}
                                    </p>
                                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                                        <Badge
                                            variant="secondary"
                                            className="capitalize"
                                        >
                                            {job.type}
                                        </Badge>
                                        <Badge variant="secondary">
                                            £{job.salary_min.toLocaleString()} –
                                            £{job.salary_max.toLocaleString()}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="ml-4 flex shrink-0 items-center gap-1">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link
                                            href={`/admin/jobs/${job.id}/edit`}
                                            aria-label="Edit"
                                        >
                                            <PencilIcon className="size-4" />
                                        </Link>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                            >
                                                <Trash2Icon />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <DeleteDialog job={job} />
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <BriefcaseIcon />
                            </EmptyMedia>
                            <EmptyTitle>No listings yet</EmptyTitle>
                            <EmptyDescription>
                                Create your first job listing to get started.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button size="sm" asChild>
                                <Link href="/admin/jobs/create">
                                    <PlusIcon data-icon="inline-start" />
                                    New Listing
                                </Link>
                            </Button>
                        </EmptyContent>
                    </Empty>
                )}

                {jobs.last_page > 1 && (
                    <div className="flex items-center justify-end gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!jobs.prev_page_url}
                            onClick={() => jobs.prev_page_url && router.get(jobs.prev_page_url)}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Page {jobs.current_page} of {jobs.last_page}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!jobs.next_page_url}
                            onClick={() => jobs.next_page_url && router.get(jobs.next_page_url)}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

function DeleteDialog({job}: {job: JobListing}) {
    const handleDelete = (job: JobListing) => {
        router.delete(`/admin/jobs/${job.id}`);
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this listing from our servers.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    variant={'destructive'}
                    onClick={() => handleDelete(job)}
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
AdminJobsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Job Listings', href: '/admin/jobs' },
    ],
};
