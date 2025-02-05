<?php
// filepath: /c:/Users/adrih/protocoleva2025/app/Models/Role.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    // Add this method to get the role display name
    public function getDisplayNameAttribute()
    {
        $roleDisplayNames = [
            'admin' => 'Administrador',
            'director' => 'Director',
            'evaluator' => 'Evaluador',
        ];

        return $roleDisplayNames[$this->name] ?? 'Sin Rol';
    }
}
