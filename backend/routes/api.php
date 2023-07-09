<?php

use App\Http\Controllers\Admin\SalesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Sales\CostumerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// check connection
Route::get('/ping', function () {
    return response()->json([
        'status' => true,
        'message' => 'pong!',
        'data' => null
    ]);
});

// Authtentication with JWT
Route::controller(AuthController::class)->group(function() {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::put('/password/reset/{id}', 'passwordReset');
    Route::post('/refresh', 'refresh');
    Route::get('/profile', 'profile');
});

Route::controller(CostumerController::class)->group(function() {
    Route::post('/customer', 'store');
    Route::put('/customer/{id}', 'update');
    Route::delete('/customer/{id}', 'destroy');
});

Route::post(
    '/sales',
    SalesController::class
)->middleware('auth:api');