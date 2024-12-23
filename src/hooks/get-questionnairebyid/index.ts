import React from "react";


interface returnResult {
  name: string;
}

export const useGetQuestionnaireById = (id: string) => {
  const [data, setData] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.146:3000/api/quest?id=${id}`, {
          method: 'GET',
        })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: returnResult = await response.json()
        setData(result.name);
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