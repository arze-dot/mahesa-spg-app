<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        // Define the valid keys for the files
        $validKeys = [
            'product',
            'asset',
            'outlet',
            'employee',
            'report'
        ];

        // Process each uploaded file
        $uploadedFiles = [];
        foreach ($request->files as $key => $file) {
            // Check if the current key is one of the valid keys
            if (in_array($key, $validKeys)) {
                // Generate the path using the key and a random string
                $path = $this->generateFilePath($file->getClientOriginalName(), $key);
                // Store the file with the generated path in the public/uploads folder
                $storedPath = Storage::disk('public')->putFileAs('uploads', $file, $path);
                // Generate the URL for the stored file
                $url = Storage::url($storedPath);
                // Add the URL to the list of uploaded files with the corresponding key
                $uploadedFiles[$key] = $url;
            }
        }

        // Return response with files object
        return response()->json(['message' => 'Files uploaded successfully', 'files' => $uploadedFiles]);
    }

    private function generateFilePath($originalFilename, $key)
    {
        $filenameWithoutExtension = pathinfo($originalFilename, PATHINFO_FILENAME);
        $extension = pathinfo($originalFilename, PATHINFO_EXTENSION);

        // Remove whitespaces from the original filename
        $filenameWithoutSpaces = str_replace(' ', '', $filenameWithoutExtension);

        // Concatenate the key with a random string and the filename without whitespaces
        return "{$key}_" . uniqid() . "_{$filenameWithoutSpaces}.{$extension}";
    }
}
