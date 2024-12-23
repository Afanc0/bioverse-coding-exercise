"use client";

import React from "react";

interface Answers {
  _id: string;
  user: string;
  answers: any;
  questionnaire: any;
}

export const useGetAllAnswers = () => {
  const [data, setData] = React.useState<Answers[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://bioverse-coding-exercise.vercel.app/api/allanswers`, {
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
    fetchData();
  }, []);

  return { data, error, loading };
};
