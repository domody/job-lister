<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobListing extends Model
{
    protected $fillable = [
        'title',
        'company',
        'location',
        'salary_min',
        'salary_max',
        'type',
        'description',
    ];
}
