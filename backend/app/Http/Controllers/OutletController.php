<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Outlet;
use Illuminate\Support\Facades\Validator as FacadesValidator;

class OutletController extends Controller
{
    public function index(Request $request)
    {
        $query = Outlet::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('code', 'like', '%' . $request->search . '%');
        }

        $outlets = $query->orderBy($request->get('sort', 'updated_at'), $request->get('order', 'desc'))
            ->paginate(10);

        return response()->json([
            'message' => 'Outlets retrieved successfully',
            'data' => $outlets
        ]);
    }

    public function store(Request $request)
    {
        $validator = FacadesValidator::make($request->all(), [
            'name' => 'required|string|max:255',
            'code' => 'required|string',
            'user_id' => 'required|exists:users,id',
            // Add other validations...
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'data' => $validator->errors()], 422);
        }

        $outlet = Outlet::create($request->all());

        return response()->json(['message' => 'Outlet created successfully', 'data' => $outlet], 201);
    }

    public function show($id)
    {
        $outlet = Outlet::find($id);

        if (!$outlet) {
            return response()->json(['message' => 'Outlet not found'], 404);
        }

        return response()->json(['message' => 'Outlet retrieved successfully', 'data' => $outlet]);
    }

    public function update(Request $request, $id)
    {
        $outlet = Outlet::find($id);

        if (!$outlet) {
            return response()->json(['message' => 'Outlet not found'], 404);
        }

        $validator = FacadesValidator::make($request->all(), [
            'name' => 'string|max:255',
            'code' => 'date',
            'user_id' => 'exists:users,id',
            // Add other validations...
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'data' => $validator->errors()], 422);
        }

        $outlet->update($request->all());

        return response()->json(['message' => 'Outlet updated successfully', 'data' => $outlet]);
    }

    public function destroy($id)
    {
        $outlet = Outlet::find($id);

        if (!$outlet) {
            return response()->json(['message' => 'Outlet not found'], 404);
        }

        $outlet->delete();

        return response()->json(['message' => 'Outlet deleted successfully']);
    }
}
