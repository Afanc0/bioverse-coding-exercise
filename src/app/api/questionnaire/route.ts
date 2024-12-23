import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/bioverse'
const client = new MongoClient(uri)

export async function GET(_request: Request): Promise<Response> {
    try {
        await client.connect()
        const database = client.db('bioverse') 
        const questionnaireCollection = database.collection('questionnaire') 

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