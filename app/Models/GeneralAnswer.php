<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'general_question_id',
        'answer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function generalQuestion()
    {
        return $this->belongsTo(GeneralQuestion::class);
    }
}
