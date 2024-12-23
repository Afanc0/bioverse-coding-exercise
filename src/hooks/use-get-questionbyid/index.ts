import React from "react";

interface QuestionItem {
  _id: number;
  type: string;
  options?: string[];
  question: string;
}

export const useGetQuestionsById = (id: string) => {
  const [data, setData] = React.useState<QuestionItem[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://bioverse-coding-exercise.vercel.app/api/question?question=${id}`, {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: QuestionItem[] = await response.json()
        setData(result);
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred')
      } finally {
        setLoading(false);
      }
    };

    fetchData()
  }, [id])

  return { data, error, loading }
};