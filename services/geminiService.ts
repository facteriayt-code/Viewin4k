
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMovieEnhancement = async (title: string, userDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the movie title "${title}" and basic description "${userDescription}", provide a professional movie synopsis (approx 30 words) and a catchy tagline. Return as JSON.`,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getAIOpinion = async (title: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Give a one-sentence witty "View in 4K" expert recommendation for a movie called "${title}".`,
    });
    return response.text;
  } catch (error) {
    return "This film is a visual masterpiece you can't miss.";
  }
};
