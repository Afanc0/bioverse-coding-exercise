import { connectToDatabase } from '@bioverse-intake/lib/mongodb'

export async function GET(request: Request): Promise<Response> {
    try {
        const url = new URL(request.url)
        const user = url.searchParams.get('user')

        const { db } = await connectToDatabase();
        const answerCollection = db.collection('answers') 

        const answers = await answerCollection.find({user: user}).toArray()

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