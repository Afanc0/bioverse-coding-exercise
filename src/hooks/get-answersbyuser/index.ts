"use client";

import React from "react";

interface Answers {
  _id: string;
  user: string;
  answers: any;
}

export const useGetAnswersByUser = (user: string) => {
  const [data, setData] = React.useState<Answers[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.146:3000/api/answer?user=${user}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError("Invalid data format received");
        }
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return { data, error, loading };
};
