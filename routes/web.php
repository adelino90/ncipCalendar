<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;

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


Route::get('/getAllEvents', [App\Http\Controllers\EventController::class, 'getAllEvents']);
Route::get('/getAllEventTypes', [App\Http\Controllers\EventController::class, 'getAllEventTypes']);
Route::post('/saveEvent', [App\Http\Controllers\EventController::class, 'saveEvent']);
