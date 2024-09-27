<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Outlet;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\ValidationException;

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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string|confirmed',
            'email' => 'required|email',
            'full_name' => 'required|string',
            'nik' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'birth_date' => 'required|date',
            'employee_status' => 'required|string',
            'gender' => 'required|string',
            'role' => 'required|string',
            'outlets' => 'nullable|array',
            'outlets.*.id' => 'nullable|exists:outlets,id',
            'outlets.*.name' => 'nullable|string',
            'outlets.*.code' => 'nullable|string',
            'outlets.*.address' => 'nullable|string',
            'outlets.*.longitude' => 'nullable|string',
            'outlets.*.latitude' => 'nullable|string',
            'outlets.*.image' => 'nullable|string',
            'outlets.*.assets' => 'nullable|array',
            'outlets.*.assets.*.id' => 'nullable|exists:assets,id',
            'outlets.*.assets.*.name' => 'nullable|string',
            'outlets.*.assets.*.code' => 'nullable|string',
            'outlets.*.assets.*.date_in' => 'nullable|date',
            'outlets.*.assets.*.date_expired' => 'nullable|date',
            'outlets.*.assets.*.image' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            // Create User
            $user = User::create([
                'full_name' => $validatedData['full_name'],
                'nik' => $validatedData['nik'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
                'address' => $validatedData['address'],
                'birth_date' => $validatedData['birth_date'],
                'employee_status' => $validatedData['employee_status'],
                'gender' => $validatedData['gender'],
                'role' => $validatedData['role'],
                'username' => $validatedData['username'],
                'password' => bcrypt($validatedData['password']),
            ]);

            // Process Outlets and Nested Assets
            if (isset($validatedData['outlets'])) {
                foreach ($validatedData['outlets'] as $outletData) {
                    if (isset($outletData['id'])) {
                        // Update existing Outlet
                        $outlet = Outlet::find($outletData['id']);
                        $outlet->update($outletData); // Update outlet with provided data
                    } else {
                        // Create new Outlet, set user_id
                        $outletData['user_id'] = $user->id; // Set user_id
                        $outlet = Outlet::create($outletData);
                    }

                    // Attach outlet to user
                    $user->outlets()->attach($outlet->id);

                    // Process Assets for the Outlet
                    if (isset($outletData['assets'])) {
                        foreach ($outletData['assets'] as $assetData) {
                            if (isset($assetData['id'])) {
                                // Update existing Asset
                                $asset = Asset::find($assetData['id']);
                                $asset->update($assetData);
                            } else {
                                // Create new Asset with the current outlet's id
                                $assetData['outlet_id'] = $outlet->id; // Ensure asset is assigned to the correct outlet
                                Asset::create($assetData);
                            }
                        }
                    }
                }
            }

            DB::commit();

            return response()->json(['message' => 'User, outlets, and assets created/updated successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create/update user', 'error' => $e->getMessage()], 500);
        }
    }
}
