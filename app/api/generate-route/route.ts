import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destination, startDate, durationDays, travelers, budget, interests } = body;

    const prompt = `You are a travel planning assistant. Create a detailed travel itinerary for ${destination} for ${durationDays} days, ${travelers} travelers, with a ${budget} budget.

Important requirements:
- Suggest 3-4 places per day
- Group nearby places together to minimize travel
- Every place must have a photo (use a relevant emoji, e.g. 📸, 🏛️, 🌊, 🏞️, 🌴)
- Include a short description, category (sightseeing, food, nature, culture, shopping, etc.), and estimated cost

Return valid JSON with the following schema:
{
  "days": [
    {
      "day": 1,
      "title": "Day 1",
      "date": "2024-01-15",
      "activities": [
        {
          "time": "09:00",
          "title": "Morning activity",
          "description": "Short description",
          "category": "sightseeing",
          "placeName": "Place name",
          "photo": "📸",
          "estimatedCost": 100
        }
      ]
    }
  ]
}

Destination: ${destination}
Start date: ${startDate}
Duration: ${durationDays} days
Travelers: ${travelers}
Budget: ${budget}
Interests: ${interests || "none"}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are a travel planning assistant. Always return valid JSON matching the requested schema. Never include text outside the JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = response.choices[0].message.content;
    if (!result) {
      return NextResponse.json(
        { success: false, error: "No response from AI" },
        { status: 500 },
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON from AI" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      itinerary: parsed.days || parsed,
    });
  } catch (error) {
    console.error("Route generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate route" },
      { status: 500 },
    );
  }
}
