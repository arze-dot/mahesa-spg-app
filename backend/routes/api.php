<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::group([
    'middleware' => ['auth:api']
], function () {
    // User Routes
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // Product Routes
    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'store']);
    Route::get('products/{id}', [ProductController::class, 'show']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    // Asset Routes
    Route::get('assets', [AssetController::class, 'index']);
    Route::post('assets', [AssetController::class, 'store']);
    Route::get('assets/{id}', [AssetController::class, 'show']);
    Route::put('assets/{id}', [AssetController::class, 'update']);
    Route::delete('assets/{id}', [AssetController::class, 'destroy']);

    // Outlet Routes
    Route::get('outlets', [OutletController::class, 'index']);
    Route::post('outlets', [OutletController::class, 'store']);
    Route::get('outlets/{id}', [OutletController::class, 'show']);
    Route::put('outlets/{id}', [OutletController::class, 'update']);
    Route::delete('outlets/{id}', [OutletController::class, 'destroy']);

    // Report Routes
    Route::get('reports', [ReportController::class, 'index']);
    Route::post('reports', [ReportController::class, 'store']);
    Route::get('reports/{id}', [ReportController::class, 'show']);
    Route::put('reports/{id}', [ReportController::class, 'update']);
    Route::delete('reports/{id}', [ReportController::class, 'destroy']);


    // Upload 
    Route::post('/upload', [FileUploadController::class, 'upload']);
});
