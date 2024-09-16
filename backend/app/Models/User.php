<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $fillable = [
        'username',
        'password',
        'avatar',
        'nik',
        'email',
        'phone',
        'address',
        'birth_date',
        'employee_status',
        'gender',
        'full_name',
        'role',
        'created_by',
        'updated_by',
    ];


    protected $hidden = [
        'password',
    ];

    public function outlets()
    {
        return $this->belongsToMany(Outlet::class);
    }

    public function assets()
    {
        return $this->belongsToMany(Asset::class);
    }

    // JWT methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
