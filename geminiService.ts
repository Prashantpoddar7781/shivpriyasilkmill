import { GoogleGenAI } from "@google/genai";
import { Supplier } from '../types';

// Initialize the Gemini API client
// API Key is assumed to be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[], suppliers: Supplier[]) => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Create a context string based on the supplier data
    const supplierContext = suppliers.map(s => 
      `- ${s.name} (${s.category}): Located in ${s.location} (Market: ${s.market}), specializes in ${s.specialty}. Price: ${s.priceRangeDisplay} (${s.priceCategories.join(', ')}). ${s.isTopSupplier ? 'Top Rated.' : ''}`
    ).join('\n');

    const systemInstruction = `
      You are a knowledgeable AI assistant for a Textile Agent's portfolio app.
      Your goal is to help potential clients find the right suppliers from our specific list.
      
      Here is our list of trusted suppliers:
      ${supplierContext}
      
      Rules:
      1. Only recommend suppliers from the list above.
      2. Be polite, professional, and concise.
      3. If a user asks about a fabric we don't have a specific supplier for, suggest the closest match or ask them to contact the agent directly.
      4. Emphasize "Top Suppliers" when appropriate.
      5. The agent's name is Vijay Sharma.
    `;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I apologize, but I am currently unable to connect to the server. Please try again later or contact the agent directly.";
  }
};