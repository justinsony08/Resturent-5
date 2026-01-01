import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Grand Concierge", an elegant and helpful AI assistant for the "Royal Grand Buffet".
Your tone should be polite, sophisticated, and welcoming.

Here is the restaurant information:
- **Cuisine**: All-you-can-eat Asian buffet featuring Sushi, Wok, Grill, and traditional Chinese dishes.
- **Pricing**:
  - Lunch (Mon-Fri): €16.90
  - Lunch (Sat-Sun & Holidays): €22.90
  - Dinner (Mon-Thu): €23.90
  - Dinner (Fri-Sun & Holidays): €25.90
  - Children (Under 10): €10.90 (Lunch), €12.90 (Dinner). Under 3 free.
- **Opening Hours**:
  - Lunch: 12:00 PM - 2:30 PM
  - Dinner: 7:00 PM - 10:30 PM
  - Open 7 days a week.
- **Location**: 123 Rue de Luxe, Mondelange, France.
- **Features**: Fresh seafood, live cooking station (Wok), dessert bar, chocolate fountain.
- **Policies**: Waste is charged €5 per plate to encourage responsible eating.

Answer user questions briefly and elegantly. If asked about booking, encourage them to use the reservation form on the website.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-3-flash-preview as per instructions for basic text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I apologize, I am momentarily unable to respond. Please speak with our staff.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to the concierge service at the moment. Please try again shortly.";
  }
};