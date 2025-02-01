<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enterprise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'address',
        'email',
        'website',
        'nif',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
