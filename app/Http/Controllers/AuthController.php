<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Session;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.loginForm');
    } 

    public function loginSubmit(Request $request){
 
        $validate = Validator::make($request->all(),[
            'username' => 'required',
            'password' => 'required'
        ]);

        if($validate->fails()){
            return response()->json([
                'message' => 'error-input',
                'messages' => $validate->messages(),
            ]);
        }

        $user = User::where('username', $request->username)->first();

        if(isset($user)){
            if(Hash::check($request->password, $user->password)){
                Auth::login($user);

                return response()->json([
                    'message' => 'success',
                ]);
            }
        }

        return response()->json([
            'message' => 'no-credential',
        ]);
    }

    public function logout() {
        Session::flush();
        Auth::logout();
  
        return Redirect('login');
    }
}

