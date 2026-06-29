<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;



class ProductAnalyzerServices {
    public function analyzeImage($base64Image, $mimeType) {
        try {
            $client = new Client();
            $response = $client->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', [
                'query' => [
                    'key' => env('GEMINI_API_KEY')
                ],
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => '
                                        You are an OCR system.

                                        Extract only products and prices that are clearly visible in the image.

                                        Rules:
                                        - Do not guess missing text.
                                        - Do not infer product names.
                                        - Do not create products that are not visible.
                                        - Ignore blurry or unreadable labels.
                                        - Remove duplicate products.
                                        - Return ONLY valid JSON.
                                        - Format:
                                        [
                                            {
                                                "name": "product name",
                                                "price": 0.00
                                            }
                                        ]
                                    '
                                ],
                                [
                                    'inlineData' => [
                                        'mimeType' => $mimeType,
                                        'data' => $base64Image
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]);

            $body = $response->getBody()->getContents();
            $data = json_decode($body, true);
            return $data;

        } catch (Exception $e) {
            return  response()->json([
                'success' => false,
                'message' => "AI failed: " . $e->getMessage()
            ], 500);
            
        }
    }

}