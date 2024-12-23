import { connectToDatabase } from '@bioverse-intake/lib/mongodb'

type Questionnaire = {
    _id: number;
    value: string;
};


const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const idNum = id ? parseInt(id) : NaN;

    if (isNaN(idNum)) {
        return new Response(
            JSON.stringify({ message: 'Error: Invalid or missing question parameter' }),
            { status: 400, headers }
        );
    }

    try {
        const { db } = await connectToDatabase();
        const questionnaireCollection = db.collection<Questionnaire>('questionnaire');
        const questionnaireName = await questionnaireCollection.findOne({ _id: idNum });

        if (!questionnaireName) {
            return new Response(
                JSON.stringify({ message: 'Questionnaire not found' }),
                { status: 404, headers }
            );
        }

        return new Response(
            JSON.stringify({ name: questionnaireName["value"] }),
            { status: 200, headers }
        );
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to fetch data from MongoDB' }),
            { status: 500, headers }
        );
    }
}
