<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\RoleModel;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;

class UserTableSeeder extends Seeder {
 
    public function run()
    {
        DB::table('users')->delete();
 
        User::create(['userUuid'=>Uuid::uuid4(),
                    'username' => 'adelino90',
                    'password' => Hash::make('admin@123'),
                    'email'=>'adelinojusto911@gmail.com',
                    'roleId'=>RoleModel::where('roleName', 'Sys Admin')->first()->roleId,
                    'contactNo'=>'09327440704',
                    'firstname'=>'Adelino',
                    'middlename'=>'Razon',
                    'lastname'=>'Justo'
                    ]);
            User::create(['userUuid'=>Uuid::uuid4(),
                    'username' => 'rjteves91',
                    'password' => Hash::make('admin@123'),
                    'email'=>'jesus.reyteves@gmail.com',
                    'roleId'=>RoleModel::where('roleName', 'Sys Admin')->first()->roleId,
                    'contactNo'=>'09327440704',
                    'firstname'=>'Rey Jesus',
                    'middlename'=>'Miranda',
                    'lastname'=>'Teves'
                    ]);
    }
 
}