# Job Lister

A simple job listing board. Supports public browsing with filtering, and an admin panel for managing listings.

---

## Getting Started

### Requirements

- idk

### Setup 

1. **Install PHP dependencies**
   ```bash
   composer install
   ```
 
2. **Install JS dependencies and build assets**
   ```bash
   npm install && npm run build
   ```
 
3. **Copy the environment file**
   ```bash
   cp .env.example .env
   ```
 
4. **Generate the app key**
   ```bash
   php artisan key:generate
   ```
 
5. **Run migrations and seed the database**
   ```bash
   php artisan migrate --seed
   ```

Once migrations are seeded, serve the app however you prefer: Laravel Herd, `php artisan serve`, or any other local server.

---

## Default admin account

| Field    | Value               |
|----------|---------------------|
| Email    | admin@example.com   |
| Password | password            |

Log in at `/login` to access the admin panel. From there, you can create, edit, and delete job listings.

## Features
 
- Public job listings with title, company, location, salary range, and job type
- Filter listings by job type (full-time, part-time, contract, freelance)
- Individual job detail pages
- Admin login to manage listings

---

## Notes on User Accounts

Public user accounts are not implemented as there is no need for them at this stage. The "Apply now" button on a listing is presentational; it doesn't do anything currently, so requiring a user account to interact with it would add complexity for no gain.

That said, the `users` table includes an `is_admin` column that gates admin access, so adding regular user accounts would simply mean creating users without that flag and building out whatever functionality sits behind it, without touching any of the existing auth or admin logic. 