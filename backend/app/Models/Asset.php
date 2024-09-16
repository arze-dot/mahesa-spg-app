<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'image',
        'date_in',
        'date_expired',
        'created_by',
        'updated_by',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function outlet()
    {
        return $this->belongsTo(Outlet::class);
    }

    // Optionally add relationships here
}
