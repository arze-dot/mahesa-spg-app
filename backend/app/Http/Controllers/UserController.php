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
            ->paginate(10);

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
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = FacadesValidator::make($request->all(), [
            'username' => 'string|max:255|unique:users,username,' . $id,
            'email' => 'string|email|max:255|unique:users,email,' . $id,
            // Add other validations...
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'data' => $validator->errors()], 422);
        }

        $user->update($request->all());

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
