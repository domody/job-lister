import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
    Empty,
    EmptyContent,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia,
} from '@/components/ui/empty';
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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { RotateCcw, SearchIcon, SearchXIcon } from 'lucide-react';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'freelance'] as const;
const SALARY_MIN = 0;
const SALARY_MAX = 100_000;

export default function JobList({ jobs }: { jobs: JobListing[] }) {
    const { filters } = usePage().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [selectedTypes, setSelectedTypes] = useState<string[]>(
        Array.isArray(filters.type)
            ? filters.type
            : filters.type
              ? [filters.type]
              : [],
    );
    const [salaryRange, setSalaryRange] = useState<[number, number]>([
        filters.salary_min ? Number(filters.salary_min) : SALARY_MIN,
        filters.salary_max ? Number(filters.salary_max) : SALARY_MAX,
    ]);

    const applyFilters = (
        newSearch: string,
        newTypes: string[],
        newSalary: [number, number],
    ) => {
        router.get(
            '/jobs',
            {
                search: newSearch,
                type: newTypes,
                salary_min:
                    newSalary[0] > SALARY_MIN ? newSalary[0] : undefined,
                salary_max:
                    newSalary[1] < SALARY_MAX ? newSalary[1] : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const handleSearch = useDebouncedCallback((value: string) => {
        applyFilters(value, selectedTypes, salaryRange);
    }, 300);

    const handleTypeToggle = (type: string) => {
        const next = selectedTypes.includes(type)
            ? selectedTypes.filter((t) => t !== type)
            : [...selectedTypes, type];
        setSelectedTypes(next);
        applyFilters(search, next, salaryRange);
    };

    const handleSalaryChange = useDebouncedCallback(
        (value: [number, number]) => {
            applyFilters(search, selectedTypes, value);
        },
        300,
    );

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

                {/* Content */}
                <div className="flex w-full flex-1 bg-background py-8">
                    <div className="container mx-auto flex flex-col gap-2 px-4">
                        <div className="flex flex-1 flex-col gap-2">
                            {/* Search */}
                            <InputGroup className="h-12">
                                <InputGroupInput
                                    placeholder="Search job title or keyword"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                />
                                <InputGroupAddon align={'inline-start'}>
                                    <SearchIcon className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                            <Separator className="my-8" />
                            {/* Jobs */}
                            {/* Count */}
                            <div className="flex w-full items-center justify-end">
                                <p className="ml-auto text-xs text-muted-foreground">
                                    {jobs.length} jobs found
                                </p>
                            </div>
                            {/* List */}
                            <div className="flex flex-row space-x-2">
                                {/* Filters */}
                                <div className="w-64 shrink-0">
                                    <div className="flex flex-col gap-4 rounded-sm border p-4">
                                        <div>
                                            <p className="mb-3 text-sm font-medium">
                                                Job Type
                                            </p>
                                            <div className="flex flex-col gap-2.5">
                                                {JOB_TYPES.map((type) => (
                                                    <div
                                                        key={type}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Checkbox
                                                            id={`type-${type}`}
                                                            checked={selectedTypes.includes(
                                                                type,
                                                            )}
                                                            onCheckedChange={() =>
                                                                handleTypeToggle(
                                                                    type,
                                                                )
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={`type-${type}`}
                                                            className="cursor-pointer capitalize"
                                                        >
                                                            {type}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-3 text-sm font-medium">
                                                Salary range
                                            </p>
                                            <Slider
                                                min={SALARY_MIN}
                                                max={SALARY_MAX}
                                                step={5_000}
                                                value={salaryRange}
                                                onValueChange={(value) => {
                                                    const next = value as [
                                                        number,
                                                        number,
                                                    ];
                                                    setSalaryRange(next);
                                                    handleSalaryChange(next);
                                                }}
                                            />
                                            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                                                <span>
                                                    £
                                                    {salaryRange[0].toLocaleString()}
                                                </span>
                                                <span>
                                                    £
                                                    {salaryRange[1].toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* List */}
                                {jobs.length > 0 ? (
                                    <>
                                        <ItemGroup className="flex-1 gap-2">
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
                                    <Empty>
                                        <EmptyHeader>
                                            <EmptyMedia variant={'icon'}>
                                                <SearchXIcon />
                                            </EmptyMedia>
                                            <EmptyTitle>
                                                No Jobs Found
                                            </EmptyTitle>
                                            <EmptyDescription>
                                                No jobs match your current
                                                filters. Try adjusting your
                                                search or selected job types.
                                            </EmptyDescription>
                                        </EmptyHeader>
                                        <EmptyContent>
                                            <Button
                                                size={'sm'}
                                                onClick={() => {
                                                    setSearch('');
                                                    setSelectedTypes([]);
                                                    setSalaryRange([
                                                        SALARY_MIN,
                                                        SALARY_MAX,
                                                    ]);
                                                    applyFilters(
                                                        '',
                                                        [],
                                                        [
                                                            SALARY_MIN,
                                                            SALARY_MAX,
                                                        ],
                                                    );
                                                }}
                                            >
                                                <RotateCcw data-icon="inline-start" />
                                                Reset Filters
                                            </Button>
                                        </EmptyContent>
                                    </Empty>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
