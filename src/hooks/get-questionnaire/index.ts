"use client"

import React from "react";

export interface Questionnaire {
  _id: number;
  value: string;
}

export const useGetQuestionnaire = () => {
  const [data, setData] = React.useState<Questionnaire[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bioverse-coding-exercise.vercel.app/api/questionnaire", {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
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