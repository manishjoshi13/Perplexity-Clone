import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage, SystemMessage} from 'langchain'
// config/mistral.js
import { ChatMistralAI } from "@langchain/mistralai";

 const mistralModel = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small", 
});

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function generateRes(message){
  let response=await geminiModel.invoke((message))
  return response.text
} 



export async function generateTitle(message){
  const response = await mistralModel.invoke([
    new SystemMessage(`
Generate a short chat title.

Rules:
- Max 5 words
- No punctuation
- No quotes
- Only return the title
    `),

    new HumanMessage(`
\`\`\`
${message}
\`\`\`
    `),
  ]);
  return response.text
} 




