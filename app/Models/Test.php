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
        'status',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_test')
            ->withPivot('completed');
    }

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

    // Add this method to get the status display name
    public function getStatusDisplayNameAttribute()
    {
        $statusDisplayNames = [
            'draft' => 'Borrador',
            'available' => 'Disponible',
            'finished' => 'Terminado',
        ];

        return $statusDisplayNames[$this->status] ?? 'Estado Desconocido';
    }
}