import { GoogleGenerativeAI } from "@google/generative-ai";
import { Supplier } from '../types';

// Initialize the Gemini API client
// API Key is assumed to be available in import.meta.env.VITE_API_KEY
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || '');

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model'; text: string }[], suppliers: Supplier[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
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
      5. The agent's name is Sajjan Poddar.
    `;

    // Convert history to the format expected by Google Generative AI
    const chatHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    }));

    // Start a chat session with system instruction and history
    const chat = model.startChat({
      systemInstruction: systemInstruction,
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I apologize, but I am currently unable to connect to the server. Please try again later or contact the agent directly.";
  }
};
