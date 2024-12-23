import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/bioverse'
const client = new MongoClient(uri)

export async function GET(request: Request): Promise<Response> {
    try {
        const url = new URL(request.url)
        const user = url.searchParams.get('user')

        await client.connect()
        const database = client.db('bioverse') 
        const answerCollection = database.collection('answers') 

        const answers = await answerCollection.find().toArray()

        return new Response(JSON.stringify(answers), {
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