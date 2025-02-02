<?php
// filepath: /c:/xampp/htdocs/protocoleva/app/Models/Test.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'values',
        'value_options',
        'project_id',
        'is_ready',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function generalQuestions()
    {
        return $this->hasMany(GeneralQuestion::class);
    }

    public function valueQuestions()
    {
        return $this->hasMany(ValueQuestion::class);
    }
}