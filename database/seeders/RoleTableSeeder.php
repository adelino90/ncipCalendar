<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\RoleModel;

class RoleTableSeeder extends Seeder {
 
    public function run()
    {
        DB::table('role')->delete();
 
        RoleModel::create(['roleName'=>'Sys Admin','description'=>'System Administrator']);
        RoleModel::create(['roleName'=>'Admin Staff','description'=>'Administrative Staff']);
        
    }
 
}