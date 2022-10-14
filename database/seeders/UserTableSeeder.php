<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\RoleModel;

class UserTableSeeder extends Seeder {
 
    public function run()
    {
        DB::table('users')->delete();
 
        User::create(['userUuid'=>'01d68bcf-ec62-4f56-ab23-26b833ce861c',
                    'username' => 'adelino90',
                    'password' => '$2y$10$wJvyD/BYPZlNxDeuAuaFxO3deUnZlCdxvycBLdpS/33moe4DB/GtW',
                    'email'=>'adelinojusto911@gmail.com',
                    'roleId'=>RoleModel::where('roleName', 'Sys Admin')->first()->roleId,
                    'contactNo'=>'09327440704',
                    'firstname'=>'Adelino',
                    'middlename'=>'Razon',
                    'lastname'=>'Justo'
                    ]);
            User::create(['userUuid'=>'01d68bcf-ec62-4f56-ab23-26b833ce861c',
                    'username' => 'rjteves91',
                    'password' => '$2y$10$wJvyD/BYPZlNxDeuAuaFxO3deUnZlCdxvycBLdpS/33moe4DB/GtW',
                    'email'=>'jesus.reyteves@gmail.com',
                    'roleId'=>RoleModel::where('roleName', 'Sys Admin')->first()->roleId,
                    'contactNo'=>'09327440704',
                    'firstname'=>'Rey Jesus',
                    'middlename'=>'Miranda',
                    'lastname'=>'Teves'
                    ]);
    }
 
}