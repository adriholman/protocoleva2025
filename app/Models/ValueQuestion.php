<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ValueQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'test_id'];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(ValueAnswer::class);
    }
}
