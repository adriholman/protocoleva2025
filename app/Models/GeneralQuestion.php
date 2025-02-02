<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'options',
        'test_id',
    ];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
