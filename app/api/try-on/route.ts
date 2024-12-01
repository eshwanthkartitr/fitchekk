// Hardcoded mock results with different styles
const MOCK_RESULTS = {
  casual: [
    'https://i.imgur.com/mock_casual_1.jpg',
    'https://i.imgur.com/mock_casual_2.jpg',
    'https://i.imgur.com/mock_casual_3.jpg',
  ],
  formal: [
    'https://i.imgur.com/mock_formal_1.jpg',
    'https://i.imgur.com/mock_formal_2.jpg',
    'https://i.imgur.com/mock_formal_3.jpg',
  ],
  streetwear: [
    'https://i.imgur.com/mock_street_1.jpg',
    'https://i.imgur.com/mock_street_2.jpg',
    'https://i.imgur.com/mock_street_3.jpg',
  ],
  // Fallback images if something goes wrong
  fallback: [
    'https://replicate.delivery/pbxt/IJE0Zy2ZqOXXGV8qjwXw1xPCmW6xZsJQkZNPJwHqgxhInHdE/output.png',
    'https://replicate.delivery/pbxt/8J83AJVKqO4K0ZkCNwXQPXPYmW6xZsJQkZNPJwHqgxhInHdE/output.png',
    'https://replicate.delivery/pbxt/QK92BYLMpN5XGV8qjwXw1xPCmW6xZsJQkZNPJwHqgxhInHdE/output.png'
  ]
};

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const personImage = data.get('person_image');
    const garmentImage = data.get('garment_image');
    const style = (data.get('style') as string) || 'casual';

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get random result based on style or fallback
    const resultArray = MOCK_RESULTS[style as keyof typeof MOCK_RESULTS] || MOCK_RESULTS.fallback;
    const randomResult = resultArray[Math.floor(Math.random() * resultArray.length)];

    // Simulate success response
    return Response.json({
      success: true,
      result: randomResult,
      metadata: {
        style: style,
        confidence: Math.random() * 100,
        processingTime: '1.5s',
        isMock: true
      }
    });

  } catch (error) {
    console.error('Mock try-on error:', error);
    
    // Always return a successful response with a fallback image
    return Response.json({
      success: true,
      result: MOCK_RESULTS.fallback[0],
      metadata: {
        style: 'fallback',
        confidence: 100,
        processingTime: '0.5s',
        isMock: true,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      }
    });
  }
}

// These functions are kept but not used - just for reference
function isValidImage(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

function getRandomSuccessMessage(): string {
  const messages = [
    "GYATT! Your fit is ready fr fr! 🔥",
    "NO CAP this combo goes crazy! 💯",
    "Rizz level increased by 1000%! 🚀",
    "Fit check passed successfully! ✨",
    "You're him/her fr fr! 👑"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
} 