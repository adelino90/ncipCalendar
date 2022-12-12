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
        $data = OfficeModel::orderBy('officeCode','ASC')->get(); 
        return $data;
    }
    public function getAllBureausOffices(){
        $data = BureauRegionModel::orderBy('bureauName','ASC')->get();
        return $data;
    }

    
    public function submitOffice(Request $request){

        $OfficeData = [
                    'bureauId' => $request->input('bureauId'),
                    'shortName'=>$request->input('shortName'),
                    'longName'=>$request->input('longName'),
                    'officeType'=>$request->input('officeType'),
                    'officeCode'=>$request->input('officeCode')
            ];

            $CreateOffice = OfficeModel::create($OfficeData);
            return $CreateOffice;
    }

    public function getOffice ($officeId){
        $data = OfficeModel::where(["officeId"=>$officeId])->first();
        return $data;

    }
    public function submitOfficeUpdate(Request $request){
        $OfficeData = [
            'bureauId' => $request->input('bureauId'),
            'shortName'=>$request->input('shortName'),
            'longName'=>$request->input('longName'),
            'officeType'=>$request->input('officeType'),
            'officeCode'=>$request->input('officeCode')
    ];

        $updateOffice =  OfficeModel::where('officeId',$request->input('officeId'))->update($OfficeData);
        return $updateOffice;
    }

    public function submitBureau(Request $request){

        $BureauData = [
                    'bureauName' => $request->input('bureauName'),
                    'description'=>$request->input('description')
            ];

            $CreateBureau = BureauRegionModel::create($BureauData);
            return $CreateBureau;
    }
    public function getBureau ($bureauId){
        $data = BureauRegionModel::where(["bureauId"=>$bureauId])->first();
        return $data;

    }
    public function submitBureauUpdate(Request $request){
        $BureauData = [
            'bureauName' => $request->input('bureauName'),
            'description'=>$request->input('description')
        ];

        $updateBureau =  BureauRegionModel::where('bureauId',$request->input('bureauId'))->update($BureauData);
        return $updateBureau;
    }
}
