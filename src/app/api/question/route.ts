import { MongoClient } from 'mongodb'

type Question = {
    _id: number,
    type: string,
    question?: string,
    options?: string[]
}

type Junction = {
    _id: number,
    question_id: number,
    questionnaire_id: number,
    priority: number
}

const uri = 'mongodb://localhost:27017/bioverse'
const client = new MongoClient(uri)

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const postHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const questionId = url.searchParams.get('question')
    const questionIdNum = questionId ? parseInt(questionId) : NaN

    if (isNaN(questionIdNum)) {
        return new Response(
            JSON.stringify({ message: 'Error: Invalid or missing question parameter' }),
            { status: 400, headers }
        )
    }

    try {
        await client.connect()

        const database = client.db('bioverse')
        const junctionCollection = database.collection<Junction>('junction')
        const questionCollection = database.collection<Question>('questions')

        const filteredData: Junction[] = await junctionCollection
            .find({ questionnaire_id: questionIdNum })
            .sort({ priority: -1 })
            .toArray()

        const questionData: Question[] = []
        for (const junction of filteredData) {
            const question = await questionCollection.findOne({ _id: junction.question_id })
            if (question) {
                questionData.push(question)
            }
        }

        return new Response(
            JSON.stringify(questionData),
            { status: 200, headers }
        )
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error)
        return new Response(
            JSON.stringify({ message: 'Failed to fetch data from MongoDB' }),
            { status: 500, headers }
        )
    }
}


export async function POST(request: Request): Promise<Response> {
    try {
        const { user, filledForm, questionIds, questionnaireId, name } = await request.json();

        // Check if required fields are provided
        if (!user || !filledForm || !questionIds || !Array.isArray(questionIds) || !questionnaireId || !name) {
            return new Response(
                JSON.stringify({ message: 'Missing or invalid required fields' }),
                { status: 400, headers: postHeaders }
            );
        }

        // Connect to the database
        await client.connect();
        const database = client.db('bioverse');

        const questionCollection = database.collection<Question>('questions');
        const answersCollection = database.collection('answers');

        // Retrieve the existing answers and questionnaire data
        const existingAnswersDoc = await answersCollection.findOne({ user });
        const existingAnswers = existingAnswersDoc?.answers || {}; // Keep existing answers intact
        const existingQuestionnaires = existingAnswersDoc?.questionnaire || {}; // Get existing questionnaire data

        // Retrieve the questions from the database based on the provided question IDs
        const questions = await questionCollection
            .find({ _id: { $in: questionIds } })
            .toArray();

        // Prepare the new answers based on the filled form and question IDs
        const newAnswers: Record<string, any> = {};

        questionIds.forEach((q_id, index) => {
            const question = questions.find((q) => q._id === q_id);
            if (question) {
                newAnswers[q_id] = {
                    question: question.question,
                    answer: filledForm[index],
                };
            }
        });

        // Preserve existing answers while adding the new ones
        const mergedAnswers = { ...existingAnswers, ...newAnswers };

        // Update the questionnaire field with the new answers
        const updatedQuestionnaires = { ...existingQuestionnaires };

        // If the questionnaire already exists, update it with the new answers
        if (updatedQuestionnaires[questionnaireId]) {
            // Ensure the name is set if not already present
            if (!updatedQuestionnaires[questionnaireId].name) {
                updatedQuestionnaires[questionnaireId].name = name;
            }
            updatedQuestionnaires[questionnaireId] = {
                ...updatedQuestionnaires[questionnaireId],
                ...newAnswers,
            };
        } else {
            // Otherwise, create a new entry for the questionnaire with the answers and name
            updatedQuestionnaires[questionnaireId] = {
                ...newAnswers,
                name, // Add the name
            };
        }

        // Update the document in the database, ensuring both answers and questionnaire fields are set
        await answersCollection.updateOne(
            { user },
            {
                $set: {
                    answers: mergedAnswers, // Keep existing answers and add the new ones
                    questionnaire: updatedQuestionnaires, // Update the questionnaire field with the new answers
                },
            },
            { upsert: true } // Create the document if it doesn't exist
        );

        return new Response(
            JSON.stringify({ message: 'Answers successfully saved' }),
            { status: 200, headers: postHeaders }
        );
    } catch (error) {
        console.error('Error saving answers:', error);
        return new Response(
            JSON.stringify({ message: 'An error occurred while saving answers' }),
            { status: 500, headers: postHeaders }
        );
    }
}
