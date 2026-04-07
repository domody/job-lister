export default function JobShow({ job }: { job: JobListing }) {
    return (
        <div className="mx-auto max-w-2xl p-8">
            <h1 className="mb-1 text-2xl font-bold">{job.title}</h1>
            <p className="mb-4 text-sm text-muted-foreground">
                {job.company} · {job.location}
            </p>
            <p className="mb-2">
                £{job.salary_min.toLocaleString()} - £
                {job.salary_max.toLocaleString()}
            </p>
            <span className="rounded border px-2 py-0.5 text-xs">
                {job.type}
            </span>
            <p className="mt-4">{job.description}</p>
        </div>
    );
}
