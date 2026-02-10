import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.GEMINI_API_KEY || !process.env.PINECONE_API_KEY) {
    console.error('Please set GEMINI_API_KEY and PINECONE_API_KEY in .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = process.env.PINECONE_INDEX || 'portfolio-rag';

async function getEmbeddings(text) {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text.replace(/\n/g, ' '));
    return result.embedding.values;
}

async function seed() {
    const dataPath = path.join(__dirname, '../portfolio-data.md');

    if (!fs.existsSync(dataPath)) {
        // Create a dummy file if not exists
        console.log('Creating sample data file...');
        const sampleData = `
# Tayyab Sohail - Portfolio Data

## Skills
- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion, TypeScript
- **Backend**: Node.js, Express, Python
- **AI/ML**: OpenAI GPT, Google Gemini, Pinecone, RAG pipelines
- **Tools**: Git, Docker, AWS

## Experience
- **Senior AI Engineer**: Specialize in building autonomous agents and RAG systems.
- **Freelance Developer**: Built 15+ web applications for international clients.

## Projects
- **Universal AI Agent**: A portfolio chatbot that uses RAG to answer questions.
- **E-commerce Platform**: A full-stack Next.js app with Stripe integration.
    `;
        fs.writeFileSync(dataPath, sampleData);
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    // Simple chunking by sections (headers)
    const chunks = rawData.split(/^#+\s/gm).filter(c => c.trim().length > 0);

    console.log(`Found ${chunks.length} chunks. Generating embeddings...`);

    const index = pinecone.Index(indexName);

    // Batch upload
    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await getEmbeddings(chunk);

        vectors.push({
            id: `chunk-${i}`,
            values: embedding,
            metadata: { text: chunk }
        });
        console.log(`Prepared chunk ${i + 1}/${chunks.length}`);
    }

    if (vectors.length > 0) {
        console.log('Upserting to Pinecone...');
        await index.upsert(vectors);
        console.log('Seeding complete!');
    } else {
        console.log('No data to seed.');
    }
}

seed().catch(console.error);
