<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RoleModel;
use App\Models\OfficeModel;
use App\Models\BureauRegionModel;


class SystemSettingsController extends Controller
{
    public function index(){
        if(Auth::check() && Auth::user()->role->roleName =='Sys Admin'){
            return view('systemSettings');
        }
        return Redirect('login');
    }

    public function getAllOffices(){
        $data = OfficeModel::get();
        return $data;
    }
    public function getAllBureausOffices(){
        $data = BureauRegionModel::get();
        return $data;
    }
}
