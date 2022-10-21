<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserAccountsController;
use App\Http\Controllers\SystemSettingsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('login', [AuthController::class, 'index'])->name('login');

Route::post('loginSubmit', [AuthController::class, 'loginSubmit'])->name('login.loginSubmit'); 
Route::post('logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/', [HomeController::class, 'index']);

//Auth::routes();
Route::get('/userAccounts', [UserAccountsController::class, 'index'])->name('userAccounts');
Route::get('/getAlluserAccounts', [UserAccountsController::class, 'getAlluserAccounts']);
Route::get('/getAllSelectValues', [UserAccountsController::class, 'getAllSelectValues']);
Route::get('/getUser/{Uuid}', [UserAccountsController::class, 'getUser']);
Route::post('/submitUserAccount', [UserAccountsController::class, 'submitUserAccounts']);
Route::post('/submitUserAccountUpdate', [UserAccountsController::class, 'submitUserAccountUpdate']);


Route::get('/systemSettings', [SystemSettingsController::class, 'index'])->name('systemSettings');
Route::get('/getAllOffices', [SystemSettingsController::class, 'getAllOffices']);
Route::get('/getAllBureausOffices', [SystemSettingsController::class, 'getAllBureausOffices']);


Route::get('/getAllEvents', [App\Http\Controllers\EventController::class, 'getAllEvents']);
Route::get('/getAllEventTypes', [App\Http\Controllers\EventController::class, 'getAllEventTypes']);
Route::post('/saveEvent', [App\Http\Controllers\EventController::class, 'saveEvent']);
