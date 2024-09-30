<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    public function index()
    {
        return Attendance::with(['user', 'outlet'])->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'outlet_id' => 'required|exists:outlets,id',
            'before_img' => 'nullable|string',
            'after_img' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Fetch user and outlet
        $user_id = $request->user_id;
        $outlet_id = $request->outlet_id;

        // Get the current date and time
        $today = now()->startOfDay();
        $now = now();

        // Check if the user already attended today
        $attendance = Attendance::where('user_id', $user_id)
            ->where('outlet_id', $outlet_id)
            ->whereDate('created_at', $today)
            ->first();

        // If attendance exists today, update either before_img or after_img
        if ($attendance) {
            if ($now->lt(now()->setTime(12, 0))) {
                // Before 12 PM: Update before_img if the user attends again
                if ($request->has('before_img')) {
                    $attendance->before_img = $request->before_img;
                }
            } elseif ($now->gt(now()->setTime(12, 0))) {
                // After 12 PM: Update after_img if the user attends in the afternoon
                if ($request->has('after_img')) {
                    $attendance->after_img = $request->after_img;
                }
            }

            $attendance->save();
            return response()->json(['message' => 'Attendance updated successfully', 'attendance' => $attendance], 200);
        }

        // If no attendance exists today, create a new record and update the before_img
        $newAttendance = Attendance::create([
            'user_id' => $user_id,
            'outlet_id' => $outlet_id,
            'before_img' => $request->before_img ?? null,
            'after_img' => $request->after_img ?? null
        ]);

        return response()->json(['message' => 'Attendance created successfully', 'attendance' => $newAttendance], 201);
    }


    public function show($id)
    {
        $attendance = Attendance::with(['user', 'outlet'])->find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        return response()->json($attendance);
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'outlet_id' => 'required|exists:outlets,id',
            'before_img' => 'required|string',
            'after_img' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $attendance->update($request->all());

        return response()->json($attendance);
    }

    public function destroy($id)
    {
        $attendance = Attendance::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $attendance->delete();

        return response()->json(['message' => 'Attendance deleted successfully']);
    }
}
