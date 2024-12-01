import { HfInference } from '@huggingface/inference'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Add debug logging
console.log('API Keys present:', {
  hf: !!process.env.HUGGING_FACE_API_KEY,
  gemini: !!process.env.GEMINI_API_KEY
})

// Initialize APIs with error handling
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY!)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const imageFile = data.get('image') as File
    const occasion = data.get('occasion') as string
    const useGemini = data.get('useGemini') === 'true'

    console.log('Request received:', {
      hasImage: !!imageFile,
      occasion,
      useGemini
    })

    if (!imageFile) {
      return Response.json({ 
        success: false, 
        error: 'No image provided' 
      }, { status: 400 })
    }
    
    let analysis = "simple test"

    try {
      

      if (useGemini) {
        console.log('Using Gemini API...')
        const imageBytes = await imageFile.arrayBuffer()
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })

        const prompt = `NAHHH FR FR analyze this rizzy fit for ${occasion} 💀 Don't hold back bestie, need that real skibidi feedback! Use maximum brain rot slang (gyatt, grimace shake, ohio, fanum tax, etc).
                        Drop that:
                        1. Rating /10 (be brutal no cap)
                        2. The overall vibe check/aesthetic analysis (is it giving?)
                        3. Color theory (ate or nah?)
                        4. Fit assessment (bussin or basic?)
                        5. How to make it more skibidi gyatt fr fr

                        Remember: Need that chronically online rizz analysis, go absolutely unhinged with the slang! Make it sound like a real NPC tiktoker would rate this fit. If it's bad, don't hesitate to say "nah this fit is NOT him/her cooking" or "bro thinks he him". If it's good, go full "GYATTTT" mode.`

        // Correct format for Gemini API
        const result = await model.generateContent({
          contents: [{
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageFile.type,
                  data: Buffer.from(imageBytes).toString('base64')
                }
              }
            ]
          }]
        })

        const response = await result.response
        analysis = response.text()
        console.log('Gemini response:', analysis)

      } else {
        console.log('Using Hugging Face API...')
        const imageBuffer = await imageFile.arrayBuffer()
        const base64Image = Buffer.from(imageBuffer).toString('base64')
        const imageUrl = `data:${imageFile.type};base64,${base64Image}`

        const chatCompletion = await hf.chatCompletion({
          model: "meta-llama/Llama-3.2-11B-Vision-Instruct",  
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this outfit for ${occasion}. Please provide a detailed fashion assessment with:
                        1. Rating /10 (Be honest and direct)
                        2. Overall Style Analysis (What's the aesthetic and does it work?)
                        3. Color Coordination (How well do the colors complement each other?)
                        4. Fit Assessment (How well do the pieces work together?)
                        5. Improvement Suggestions (Specific recommendations to enhance the look)

                        Please provide constructive feedback with clear explanations for each point. Consider current fashion trends, the occasion's requirements, and overall style cohesion. Be direct but professional in your assessment.`
                },
                {
                  type: "image_url",
                  image_url: { url: imageUrl }
                }
              ]
            }
          ],
          max_tokens: 500
        })
        
        if (chatCompletion.choices[0].message.content) {
          analysis = chatCompletion.choices[0].message.content
          console.log('Hugging Face response:', analysis)
        } else {
          console.error('Hugging Face response content is undefined')
        }
      }

      // Clean up the analysis text
      const cleanAnalysis = cleanupAnalysis(analysis)
      const feedback = generateFeedback(cleanAnalysis, occasion)

      return Response.json({ 
        success: true,
        feedback,
        rawAnalysis: cleanAnalysis
      })

    } catch (apiError) {
      console.error('API Error:', apiError)
      return Response.json({ 
        success: false, 
        error: 'Failed to analyze image',
        details: apiError instanceof Error ? apiError.message : 'Unknown error',
        stack: apiError instanceof Error ? apiError.stack : undefined
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Request Error:', error)
    return Response.json({ 
      success: false, 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

function cleanupAnalysis(text: string): string {
  return text
    .replace(/\*\*/g, '') // Remove **
    .replace(/\n\n/g, '\n') // Remove double line breaks
    .replace(/^\s+|\s+$/g, '') // Trim whitespace
    .replace(/([.!?])\s*(?=[A-Z])/g, '$1\n') // Add line breaks between sentences
}

function generateFeedback(analysisText: string, occasion: string) {
  const sections = analysisText.split('\n').filter(Boolean)
  
  // Extract rating
  const ratingMatch = sections[0].match(/(\d+)\/10/)
  const rating = ratingMatch ? parseInt(ratingMatch[1]) : 5

  return {
    rating: `${rating}/10 - ${getConfidenceLevel(rating)}`,
    sections: sections.slice(1), // Remove rating from sections
    dominanceScore: calculateDominanceScore(analysisText),
    occasion: occasion
  }
}



function calculateDominanceScore(text: string): number {
  const dominanceTerms = [
    'confident', 'powerful', 'strong', 'commanding', 'authoritative',
    'bold', 'sharp', 'precise', 'clean', 'professional', 'impressive'
  ]
  
  const matches = dominanceTerms.filter(term => 
    text.toLowerCase().includes(term)
  ).length
  
  return Math.max(Math.min(Math.round((matches / dominanceTerms.length) * 10), 10), 1)
}

function getConfidenceLevel(score: number): string {
  if (score >= 9) return "Supreme Sigma"
  if (score >= 7) return "Rising Sigma"
  if (score >= 5) return "Potential Sigma"
  if (score >= 3) return "Beta Warning"
  return "Requires Immediate Action"
} 