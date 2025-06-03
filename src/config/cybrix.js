
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "<your_api_key>"; // Replace with your Google Generative AI API key
const genAi = new GoogleGenerativeAI(apiKey);
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];
const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings 
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });
  
  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());

  return result.response.text();
}

export default run;
