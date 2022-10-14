<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\EventTypeModel;

class EventTypeTableSeeder extends Seeder {
 
    public function run()
    {
        DB::table('event_type')->delete();
        EventTypeModel::create(['eventTypeName'=>'Personal','active'=>'Y']);
        EventTypeModel::create(['eventTypeName'=>'Internal','active'=>'Y']);
        EventTypeModel::create(['eventTypeName'=>'Agency Wide','active'=>'Y']);
        EventTypeModel::create(['eventTypeName'=>'Others','active'=>'Y']);
        
    }
 
}