import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {HumanMessage, SystemMessage,createAgent,tool} from 'langchain'
// config/mistral.js
import { ChatMistralAI } from "@langchain/mistralai";
import {sendEmail} from "./mail.service.js";
import * as z from "zod"
import internetSearch from "./internet.service.js";

 const mistralModel = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small", 
});

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const searchTool = tool(internetSearch, {
  name: "internet_search",
  description: "Search the internet for information.",
  schema: z.object({
    query: z.string().describe("The search query."),
  }),
});

const sendEmailTool = tool(sendEmail, {
  name: "send_email",
  description: `You are an email-sending assistant

Send an email ONLY if the user explicitly requests it.

Required:
- recipient_email
- subject
- sender_name
- sender_email (very important)

Optional:
- contact_info

Rules:
- If any required field is missing → ask for it.
- Do NOT assume or auto-fill missing data.
- Do NOT send with incomplete info.
- Also add the senders email in the email body.

When all details are provided:
- Generate a professional email
- Confirm it is ready to send`,
  schema: z.object({
    to: z.string().describe("The recipient's email address."),
    subject: z.string().describe("The subject of the email."),
    html: z.string().describe("The body of the email."),
    text: z.string().describe("The body of the email."),
  }),
});


const agent = createAgent({
  model: mistralModel,
  tools: [searchTool,sendEmailTool],
  systemMessage: "You are a helpful assistant. Use the internet_search tool to search the internet for information.",
}); 


export async function generateRes(message){
  let response=await agent.invoke({messages:message})
  return response.messages[response.messages.length-1].text
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




