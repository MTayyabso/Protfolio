import { pinecone, indexName } from './vector-store';
import { getEmbeddings } from './embeddings';

export const tools = [
    {
        name: 'search_portfolio',
        description: 'Search the portfolio database for relevant information about the user (skills, projects, experience). Use this whenever the user asks a specific question about the portfolio owner.',
        parameters: {
            type: 'OBJECT',
            properties: {
                query: {
                    type: 'STRING',
                    description: 'The search query to find relevant information.',
                },
            },
            required: ['query'],
        },
    },
];

export async function searchPortfolio(query: string) {
    try {
        const vector = await getEmbeddings(query);
        const index = pinecone.Index(indexName);

        // Query Pinecone
        const queryResponse = await index.query({
            vector: vector,
            topK: 3,
            includeMetadata: true,
        });

        return queryResponse.matches.map((match) => match.metadata?.text).join('\n\n');
    } catch (error) {
        console.error('Error searching portfolio:', error);
        return 'Error searching portfolio database.';
    }
}
