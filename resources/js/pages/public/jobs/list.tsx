import { Badge } from '@/components/ui/badge';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Head, Link, usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';

export default function JobList({ jobs }: { jobs: JobListing[] }) {
    return (
        <>
            <Head title="Jobs" />
            <div className="flex flex-col items-center">
                {/* Hero */}
                <div className="bg- w-full pt-16">
                    <div className="container mx-auto flex flex-col gap-2 px-4">
                        <h1 className="text-4xl font-semibold">
                            Find your dream job
                        </h1>
                        <p className="text-muted-foreground">
                            Browse our latest job openings to view and apply to
                            the best jobs today!
                        </p>
                    </div>
                </div>

                {/* Cont. */}
                <div className="flex w-full flex-1 bg-background py-8">
                    <div className="container mx-auto flex flex-col gap-2 px-4">
                        <div className="flex flex-1 flex-col gap-2">
                            {/* Search */}
                            <InputGroup className="h-12">
                                <InputGroupInput
                                    id=""
                                    placeholder="Search job title or keyword"
                                />
                                <InputGroupAddon align={'inline-start'}>
                                    <SearchIcon className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                            <Separator className="my-8" />
                            {/* Jobs */}
                            <div className="flex flex-row gap-2">
                                {/* Filter */}
                                <div className="h-96 w-[420px] rounded-sm border"></div>
                                {/* List */}
                                {jobs.length > 0 ? (
                                    <>
                                        <ItemGroup className="flex-1 gap-2">
                                            <div className="w-full flex justify-end items-center">
                                                <p className="text-xs text-muted-foreground ml-auto">
                                                    {jobs.length} jobs found
                                                </p>
                                            </div>
                                            {jobs.map((job) => {
                                                return (
                                                    <Item
                                                        key={job.id}
                                                        variant={'muted'}
                                                        className="group/job hover:shadow"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/jobs/${job.id}`}
                                                        >
                                                            <ItemContent>
                                                                <ItemTitle className="group-hover/job:underline">
                                                                    {job.title}
                                                                </ItemTitle>
                                                                <ItemDescription>
                                                                    {
                                                                        job.company
                                                                    }
                                                                    ,{' '}
                                                                    {
                                                                        job.location
                                                                    }
                                                                </ItemDescription>
                                                                <div className="mt-1 flex flex-row flex-wrap gap-2">
                                                                    <Badge
                                                                        variant={
                                                                            'secondary'
                                                                        }
                                                                    >
                                                                        £
                                                                        {job.salary_min.toLocaleString()}{' '}
                                                                        - £
                                                                        {job.salary_max.toLocaleString()}
                                                                    </Badge>
                                                                    <Badge
                                                                        variant={
                                                                            'secondary'
                                                                        }
                                                                    >
                                                                        {
                                                                            job.type
                                                                        }
                                                                    </Badge>
                                                                </div>
                                                            </ItemContent>
                                                        </Link>
                                                    </Item>
                                                );
                                            })}{' '}
                                        </ItemGroup>
                                    </>
                                ) : (
                                    <div>Nothing here</div>
                                )}

                                {/* Detail Preview */}
                                <div className=""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
