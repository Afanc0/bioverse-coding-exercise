import questionnaire from "@bioverse-intake/data/questionnaire.json"


export async function GET(_request: Request): Promise<Response> {
    return new Response(JSON.stringify(questionnaire), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
}