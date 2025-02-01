<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValueQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_id',
        'name',
    ];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
