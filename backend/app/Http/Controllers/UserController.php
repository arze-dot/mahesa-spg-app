<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $query->where('username', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        $users = $query->orderBy($request->get('sort', 'updated_at'), $request->get('order', 'desc'))
            ->get();

        return response()->json([
            'message' => 'Users retrieved successfully',
            'data' => $users
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json(['message' => 'User retrieved successfully', 'data' => $user]);
    }

    public function update(Request $request, $id)
    {
        // Find the user by ID
        $user = User::find($id);

        // If the user doesn't exist, return a 404 error
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validate the request
        $validator = FacadesValidator::make($request->all(), [
            'username' => 'string|max:255|unique:users,username,' . $id,
            'email' => 'string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8', // Add validation for password
            // Add other validations...
        ]);

        // If validation fails, return a 422 error
        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'data' => $validator->errors()], 422);
        }

        // Get the validated data
        $data = $request->all();

        // Check if a password is being updated
        if ($request->has('password')) {
            // Hash the password using bcrypt
            $data['password'] = bcrypt($request->input('password'));
        }

        // Update the user with the validated data
        $user->update($data);

        // Return success message and updated user data
        return response()->json(['message' => 'User updated successfully', 'data' => $user]);
    }


    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
