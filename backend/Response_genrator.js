import 'dotenv/config';
import OpenAI from "openai";  
import {systemPromptHC,systemPromptPA} from './systemPrompt.js';

export default async function Response_genrator(person,question,history){
        const openai = new OpenAI({
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    const systemPrompt = person === "Hitesh Choudhary" ? systemPromptHC : systemPromptPA;

    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            ...history.map(entry => ({
                role: entry.role,
                content: entry.content
            })),
            {
                role:"user",
                content:question
            }
        ],
    });

    // console.log(response.choices[0].message);
    return response.choices[0].message;
}
// console.log(await HC());