<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Support\Facades\Validator as Validator;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::query()->with('product'); // Eager load the product details

        if ($request->has('search')) {
            // Add search logic here if needed
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('report_column', 'like', '%' . $search . '%') // Adjust 'report_column' as needed
                    ->orWhereHas('product', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%'); // Assuming 'name' is a column in the products table
                    });
            });
        }

        $reports = $query->orderBy($request->get('sort', 'updated_at'), $request->get('order', 'desc'))
            ->get();

        return response()->json([
            'message' => 'Reports retrieved successfully',
            'data' => $reports
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'outlet_id' => 'required|exists:outlets,id',
            'product_id' => 'required|exists:products,id',
            'attendance_date' => 'required|date',
            'first_stock' => 'required|integer',
            'sell_in' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'data' => $validator->errors()], 422);
        }

        $report = Report::create($request->all());

        return response()->json(['message' => 'Report created successfully', 'data' => $report], 201);
    }

    public function show($id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        return response()->json(['message' => 'Report retrieved successfully', 'data' => $report]);
    }

    public function update(Request $request, $id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'exists:users,id',
            'outlet_id' => 'exists:outlets,id',
            'product_id' => 'exists:products,id',
            'attendance_date' => 'date',
            'first_stock' => 'integer',
            'sell_in' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed', 'data' => $validator->errors()], 422);
        }

        $report->update($request->all());

        return response()->json(['message' => 'Report updated successfully', 'data' => $report]);
    }

    public function destroy($id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json(['message' => 'Report not found'], 404);
        }

        $report->delete();

        return response()->json(['message' => 'Report deleted successfully']);
    }
}
