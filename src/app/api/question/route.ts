import junction from "@bioverse-intake/data/questionnaire_junction.json"
import question from "@bioverse-intake/data/questions.json"

type Question = {
    _id: number,
    type: string,
    question?: string,
    options?: string[]
}

type Junction = {
    _id: number
    question_id: number,
    questionnaire_id: number,
    priority: number
}

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const questionId = url.searchParams.get('question')
    const questionIdNum = questionId ? parseInt(questionId) : NaN

    if (isNaN(questionIdNum)) {
        return new Response(
            JSON.stringify({ message: 'Error: Invalid or missing question parameter' }),
            { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        )
    }

    const filteredData: Junction[] = junction.filter(item => item.questionnaire_id === questionIdNum)
    const prioritizedData = filteredData.sort((a, b) => b.priority - a.priority)

    const questionCollections: Question[] = []
    for (const questionBlock of prioritizedData) {
        const questionObject = question.find(q => q._id === questionBlock.question_id)
        if (questionObject) {
            questionCollections.push(questionObject)
        }
    }

    return new Response(
        JSON.stringify(questionCollections),
        { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    )
}
