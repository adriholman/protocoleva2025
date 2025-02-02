<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'enterprise_id',
        'test_limit',
    ];

    public function enterprise()
    {
        return $this->belongsTo(Enterprise::class);
    }

    public function tests()
    {
        return $this->hasMany(Test::class);
    }
}