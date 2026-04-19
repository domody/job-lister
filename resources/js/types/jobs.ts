type JobListing = {
    id: number;
    title: string;
    company: string;
    location: string;
    salary_min: number;
    salary_max: number;
    type: string;
    description: string;
};

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

