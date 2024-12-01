import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const personImage = data.get('person_image') as File;
    const garmentImage = data.get('garment_image') as File;

    if (!personImage || !garmentImage) {
      return Response.json({ 
        success: false, 
        error: 'Missing required images' 
      }, { status: 400 });
    }

    // Call the Kolors Virtual Try-On API
    const result = await hf.spaceInference({
      spaceId: "Kwai-Kolors/Kolors-Virtual-Try-On",
      inputs: {
        person_img: await personImage.arrayBuffer(),
        garment_img: await garmentImage.arrayBuffer(),
        seed: Math.floor(Math.random() * 999999),
        randomize_seed: true
      }
    });

    return Response.json({
      success: true,
      result: result.image
    });

  } catch (error) {
    console.error('Try-on error:', error);
    return Response.json({ 
      success: false, 
      error: 'Try-on failed' 
    }, { status: 500 });
  }
} 