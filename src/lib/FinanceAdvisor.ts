// utils/getFinancialAdvice.js
import OpenAI from "openai";
import { getTransaction } from "./actions";
import { Transaction } from "@prisma/client";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

let trans: Transaction[] = [];

export async function getTransactions() {
  try {
    trans = await getTransaction();

    // console.log("-----------------");
    // console.log("trans: ", trans.splice(0, 6));
    // console.log("-----------------");
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

// Function to generate personalized financial advice
const getFinancialAdvice = async () => {
  try {
    if (!trans.length) {
      await getTransactions();
    }

    const final = trans.splice(0, 6);
    // console.log("Final: ", final);

    const userPrompt = `
      Based on my following user transactional data:
      ${JSON.stringify(final, null, 2)}
      Provide detailed financial summary and advice in 2 sentences to help the user to get insights of their transaction and can manage their finances and spendings more effectively like where to spend more or where the user is spending more and please include some emojis related to that.
    `;

    // Send the prompt to the OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userPrompt }],
    });

    // Process and return the response
    const advice = chatCompletion.choices[0].message.content;

    // console.log(advice);
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
