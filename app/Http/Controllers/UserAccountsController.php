<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\RoleModel;
use App\Models\OfficeModel;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;


class UserAccountsController extends Controller
{
    
    public function index(){
        if(Auth::check() && Auth::user()->role->roleName =='Sys Admin'){
            return view('userAccounts');
        }
        return Redirect('login');
    }

    public function getAlluserAccounts(){
        $data = User::with('role')->get();
        return $data;
    }

    public function getAllSelectValues(){
        $data = ['Roles'=>RoleModel::get(),
                'Offices'=>OfficeModel::get()
                ];

        return $data;
    }

    public function submitUserAccounts(Request $request){

        $UserData = [
                    'userUuid'=>Uuid::uuid4(),
                    'username' => $request->input('username'),
                    'password' => Hash::make($request->input('password')),
                    'email'=>$request->input('email'),
                    'roleId'=>$request->input('roleId'),
                    'officeId'=>$request->input('officeId'),
                    'contactNo'=>$request->input('contactNo'),
                    'firstname'=>$request->input('firstname'),
                    'middlename'=>$request->input('middlename'),
                    'lastname'=>$request->input('lastname'),
            ];

            $createUser = User::create($UserData);
            return $createUser;
    }

    public function getUser ($Uuid){
        $data = User::where(["userUuid"=>$Uuid])->with('role')->first();
        return $data;

    }

    public function submitUserAccountUpdate(Request $request){
        $UserData = [
            'username' => $request->input('username'),
            'email'=>$request->input('email'),
            'roleId'=>$request->input('roleId'),
            'officeId'=>$request->input('officeId'),
            'contactNo'=>$request->input('contactNo'),
            'firstname'=>$request->input('firstname'),
            'middlename'=>$request->input('middlename'),
            'lastname'=>$request->input('lastname'),
        ];

        $updateUser = User::where('userUuid',$request->input('Uuid'))->update($UserData);
        return $updateUser;
    }
}

