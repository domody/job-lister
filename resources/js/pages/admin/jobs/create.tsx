import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Head, Link, useForm } from '@inertiajs/react';

const JOB_TYPES = ['full-time', 'part-time', 'contract', 'freelance'] as const;

type JobForm = {
    title: string;
    company: string;
    location: string;
    salary_min: string;
    salary_max: string;
    type: string;
    description: string;
};

export default function AdminJobCreate() {
    const { data, setData, post, errors, processing } = useForm<JobForm>({
        title: '',
        company: '',
        location: '',
        salary_min: '',
        salary_max: '',
        type: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/jobs');
    };

    return (
        <>
            <Head title="New Listing" />
            <div className="mx-auto max-w-2xl p-6">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold">New Listing</h1>
                    <p className="text-sm text-muted-foreground">Add a new job listing to the board</p>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid gap-1.5">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Senior Software Engineer"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="company">Company</Label>
                        <Input
                            id="company"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            placeholder="e.g. Acme Corp"
                        />
                        <InputError message={errors.company} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="e.g. London, UK or Remote"
                        />
                        <InputError message={errors.location} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="salary_min">Min Salary (£)</Label>
                            <Input
                                id="salary_min"
                                type="number"
                                min={0}
                                value={data.salary_min}
                                onChange={(e) => setData('salary_min', e.target.value)}
                                placeholder="e.g. 40000"
                            />
                            <InputError message={errors.salary_min} />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="salary_max">Max Salary (£)</Label>
                            <Input
                                id="salary_max"
                                type="number"
                                min={0}
                                value={data.salary_max}
                                onChange={(e) => setData('salary_max', e.target.value)}
                                placeholder="e.g. 60000"
                            />
                            <InputError message={errors.salary_max} />
                        </div>
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="type">Job Type</Label>
                        <Select value={data.type} onValueChange={(v) => setData('type', v)}>
                            <SelectTrigger id="type" className="w-full">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                {JOB_TYPES.map((t) => (
                                    <SelectItem key={t} value={t} className="capitalize">
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.type} />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            rows={8}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Describe the role, responsibilities, and requirements..."
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            Create Listing
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/admin/jobs">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

AdminJobCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Job Listings', href: '/admin/jobs' },
        { title: 'New Listing', href: '/admin/jobs/create' },
    ],
};
