<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [\App\Http\Controllers\UserController::class, 'login'])->name('login');

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('register', [\App\Http\Controllers\UserController::class, 'register'])->name('register');
});

Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::get('broadcastMessage', [\App\Http\Controllers\MessageController::class, 'broadcastMessage'])->name('broadcastMessage');
    Route::post('logout', [\App\Http\Controllers\UserController::class, 'logout'])->name('logout');
    Route::post('refresh', [\App\Http\Controllers\UserController::class, 'refresh'])->name('refresh');
    Route::post('me', [\App\Http\Controllers\UserController::class, 'me'])->name('me');
});
