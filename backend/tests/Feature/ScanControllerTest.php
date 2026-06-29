<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Mockery;
use Tests\TestCase;

class ScanControllerTest extends TestCase
{
    
    public function test_receive_image_returns_base64() {
        // SETUP: Create a fake image file
        $file = UploadedFile::fake()->image('receipt.jpg', 500, 500);
        
        // ACT: Send request to endpoint
        $response = $this->post('/api/cart/scan', [
            'image' => $file
        ]);
        
        // ASSERT: Check response
        $response->assertStatus(200);
        $response->assertJsonStructure(['success', 'base64', 'mime', 'message']);
    }

        
    public function test_analyze_to_ai_extracts_items() {
        // MOCK: Tell Guzzle to return fake Gemini response
        $mockResponse = Mockery::mock();
        $mockResponse->shouldReceive('getBody->getContents')
            ->andReturn(json_encode([
                'candidates' => [
                    ['content' => ['parts' => [['text' => '[{"name":"Milk","price":3.50}]']]]]
                ]
            ]));
        
        // ACT: Call function with fake data
        $result = $this->analyzeImage('fake_base64_data', 'image/jpeg');
        
        // ASSERT: Check result
        $this->assertTrue($result['success']);
        $this->assertCount(1, $result['items']);
    }
}
