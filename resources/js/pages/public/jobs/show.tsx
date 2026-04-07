import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    BriefcaseIcon,
    BuildingIcon,
    MapPinIcon,
    WalletIcon,
} from 'lucide-react';

export default function JobShow({ job }: { job: JobListing }) {
    return (
        <>
            <Head title={job.title} />
            <div className="flex flex-col items-center">
                {/* Hero */}
                <div className="w-full pt-16 pb-8">
                    <div className="container mx-auto flex flex-col gap-4 px-4">
                        <Link
                            href="/"
                            className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeftIcon className="size-4" />
                            Back to Jobs
                        </Link>

                        <div>
                            <h1 className="mb-1 text-4xl font-semibold">
                                {job.title}
                            </h1>
                            <p className="text-muted-foreground">
                                {job.company} · {job.location}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                                £{job.salary_min.toLocaleString()} - £
                                {job.salary_max.toLocaleString()}
                            </Badge>
                            <Badge variant="secondary" className="capitalize">
                                {job.type}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full flex-1 bg-background py-8">
                    <div className="container mx-auto px-4">
                        <Separator className="mb-8" />
                        <div className="flex flex-col gap-8 lg:flex-row">
                            {/* Description */}
                            <div className="flex-1">
                                <h2 className="mb-4 text-sm font-medium">
                                    Job Description
                                </h2>
                                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                                    {job.description}
                                </p>
                            </div>

                            {/* Sidebar */}
                            <div className="shrink-0 lg:w-72">
                                <div className="flex flex-col gap-4 rounded-sm border p-4">
                                    <p className="text-sm font-medium">
                                        Job Details
                                    </p>
                                    <Separator />
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <BuildingIcon className="size-4 shrink-0 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Company
                                            </span>
                                            <span className="ml-auto font-medium">
                                                {job.company}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Location
                                            </span>
                                            <span className="ml-auto font-medium">
                                                {job.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <BriefcaseIcon className="size-4 shrink-0 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Type
                                            </span>
                                            <span className="ml-auto font-medium capitalize">
                                                {job.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <WalletIcon className="size-4 shrink-0 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Salary
                                            </span>
                                            <span className="ml-auto font-medium">
                                                £{job.salary_min.toLocaleString()} –
                                                £{job.salary_max.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <Button className="w-full">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
