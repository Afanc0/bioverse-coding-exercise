import React from "react"

export const useAddQuestionEntries = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  const addResponses = async (user: string, filledForm: Record<number, any>, id: number[], questionnaireId: string, name: string) => {
    try {
      const response = await fetch(`https://bioverse-coding-exercise.vercel.app/api/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          filledForm: filledForm,
          questionIds: id,
          questionnaireId: questionnaireId,
          name: name
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error: any) {
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false)
    }
  }

  return { error, loading, addResponses }
}
