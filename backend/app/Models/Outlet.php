<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outlet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'user_id',
        'area_code',
        'longitude',
        'latitude',
        'address',
        'image',
        'created_by',
        'updated_by',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

    // Optionally add relationships here
}
