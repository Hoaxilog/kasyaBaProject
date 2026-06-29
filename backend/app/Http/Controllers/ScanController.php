<?php

namespace App\Http\Controllers;

use App\Services\ProductAnalyzerServices;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ScanController extends Controller
{

    protected $productAnalyzerServices;

    public function __construct(ProductAnalyzerServices $productAnalyzerServices)
    {
        $this->productAnalyzerServices = $productAnalyzerServices;
    }

    public function receiveImage(Request $request)  {
        $request->validate([
            'image' => 'required|image|max:5120', //5mb
        ]);

        if($request->hasFile('image')) {
            $file = $request->file('image');

            //converting image to base64
            $convertedImage = base64_encode(file_get_contents($file->getRealPath()));
            $mime = $file->getMimeType();

            try {
                $aiResponse = $this->productAnalyzerServices->analyzeImage($convertedImage, $mime);

                $text = data_get($aiResponse, 'candidates.0.content.parts.0.text');
                
                if (!$text) {
                    throw new Exception('Gemini returned no text');
                }

                $text = preg_replace('/```json|```/', '', $text);
                $text = trim($text);

                $items = json_decode($text, true);


                return response()->json([
                    'success' => true,
                    'response' => $items,
                    'message' => "Image received successfully"
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'hasFile' => $request->hasFile('image'),
                    'success' => false,
                    'message' => $e->getMessage()
                ], 500);
            }

        }

    }

}
