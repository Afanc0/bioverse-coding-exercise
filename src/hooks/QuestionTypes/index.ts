"use client"

import React from "react";

export type QuestionSelectionItem = {
  [id: string]: string;
};

export const useQuestionTypes = () => {
  const [data, setData] = React.useState<QuestionSelectionItem | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.146:3000/api/questionnaire", {
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