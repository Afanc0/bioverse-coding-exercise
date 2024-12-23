import { connectToDatabase } from '@bioverse-intake/lib/mongodb'

export async function GET(_request: Request): Promise<Response> {
    try {
        const { db } = await connectToDatabase();
        const questionnaireCollection = db.collection('questionnaire') 

        const questionnaire = await questionnaireCollection.find({}).toArray()

        return new Response(JSON.stringify(questionnaire), {
            status: 200,
            headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            }
        })
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error)
        return new Response('Failed to fetch data from MongoDB', { status: 500 })
    }
}