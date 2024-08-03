<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'nik' => 'required|string|size:16|unique:users',
            'phone' => 'required|string',
            'address' => 'string|nullable',
            'birth_date' => 'date|nullable',
            'employee_status' => 'string|nullable',
            'gender' => 'string|size:1|nullable',
            'full_name' => 'required|string|max:255',
            'role' => 'string|in:user,admin|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nik' => $request->nik,
            'phone' => $request->phone,
            'address' => $request->address,
            'birth_date' => $request->birth_date,
            'employee_status' => $request->employee_status,
            'gender' => $request->gender,
            'full_name' => $request->full_name,
            'role' => $request->role ?? 'user',

        ]);


        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        // Data validation
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json(['error' => 'Error Validation', 'message' => $validator->errors()], 400);
        }

        // JWTAuth
        $myTTL = 60 * 24 * 7;
        JWTAuth::factory()->setTTL($myTTL);
        $token = JWTAuth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ]);

        if (!empty($token)) {

            return response()->json([
                "status" => true,
                "message" => "User logged in succcessfully",
                "token" => $token
            ]);
        }

        return response()->json([
            "status" => false,
            "message" => "Invalid details"
        ]);
    }
}
