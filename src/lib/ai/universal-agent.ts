import { GoogleGenerativeAI } from '@google/generative-ai';
import { tools, searchPortfolio } from './tools';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_INSTRUCTION = `
You are the "System Overseer" for this portfolio. 
Your role is to answer questions about the portfolio owner effectively and professionally.
You have access to a tool 'search_portfolio' which you MUST use if the user asks any specific question about the owner's skills, projects, experience, or background.
Do not make up facts. If search results are empty, admit you don't know but offer to pass a message.
Be concise but friendly.
`;

export async function chatWithAgent(message: string, history: any[] = []) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Start a chat session
        const chat = model.startChat({
            history: history,
            // @ts-expect-error - The types for tools are complex and might not match exactly but this is correct for the API
            tools: {
                functionDeclarations: tools
            }
        });

        // Send the message
        const result = await chat.sendMessage(message);
        const response = await result.response;

        // Check for function calls
        const functionCalls = response.functionCalls();

        if (functionCalls && functionCalls.length > 0) {
            const call = functionCalls[0];
            if (call.name === 'search_portfolio') {
                // Execute the tool
                // @ts-expect-error - args is typed loosely
                const toolResult = await searchPortfolio(call.args.query);

                // Feed result back
                const finalResult = await chat.sendMessage([{
                    functionResponse: {
                        name: 'search_portfolio',
                        response: {
                            result: toolResult
                        }
                    }
                }]);
                return finalResult.response.text();
            }
        }

        return response.text();
    } catch (error: any) {
        console.error('Agent Error:', error);
        return `Error: ${error.message || JSON.stringify(error)}`;
    }
}
