import { generateText, Output } from "ai"
import * as z from "zod"

const foodItemSchema = z.object({
  name: z.string().describe("Name of the food item"),
  portion: z.string().describe("Estimated portion size (e.g., '1 cup', '150g')"),
  confidence: z
    .number()
    .min(0)
    .max(100)
    .describe("Confidence percentage of identification"),
  calories: z.number().describe("Estimated calories"),
  protein: z.number().describe("Protein in grams"),
  carbs: z.number().describe("Carbohydrates in grams"),
  fat: z.number().describe("Fat in grams"),
  fiber: z.number().describe("Fiber in grams"),
  sugar: z.number().describe("Sugar in grams"),
  sodium: z.number().describe("Sodium in milligrams"),
})

const nutritionAnalysisSchema = z.object({
  foods: z.array(foodItemSchema).describe("Array of identified food items"),
  totalNutrition: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
    fiber: z.number(),
    sugar: z.number(),
    sodium: z.number(),
  }),
  healthInsights: z
    .array(z.string())
    .describe("Health tips and insights about the meal"),
  mealType: z
    .enum(["breakfast", "lunch", "dinner", "snack"])
    .describe("Most likely meal type based on the food items"),
})

export async function POST(req: Request) {
  try {
    const { image } = await req.json()

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    const { output } = await generateText({
      model: "openai/gpt-4o",
      output: Output.object({
        schema: nutritionAnalysisSchema,
      }),
      messages: [
        {
          role: "system",
          content: `You are an expert nutritionist and food recognition specialist. Your task is to:
1. Identify all visible food items in the image with high accuracy
2. Estimate realistic portion sizes based on visual cues
3. Calculate nutritional values based on standard food databases (USDA)
4. Provide helpful health insights about the meal

Be accurate but conservative in your estimates. If you're unsure about a food item, still include it with a lower confidence score. Always aim to identify ALL visible food items, including beverages, sauces, and garnishes.

Round all numerical values to reasonable precision (whole numbers for calories, one decimal for grams).`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this food image and provide a comprehensive nutritional breakdown. Identify each food item, estimate portions, and calculate the complete nutritional information.",
            },
            {
              type: "image",
              image: image,
            },
          ],
        },
      ],
    })

    return Response.json({ analysis: output })
  } catch (error) {
    console.error("Food analysis error:", error)
    
    // Check if it's a credit card verification error
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes("credit card") || errorMessage.includes("customer_verification")) {
      return Response.json(
        { 
          error: "AI Gateway requires account verification. Please add a credit card to your Vercel account to enable AI features, or use the Demo Mode to preview the app.",
          requiresVerification: true
        },
        { status: 403 }
      )
    }
    
    return Response.json(
      { error: "Failed to analyze food image. Please try again." },
      { status: 500 }
    )
  }
}
