"use client"
/*
    TODO:
        Function: Enables administrators to view a different users’ answers organized
        • Features: A table of usernames and how many questionnaires they have completed.
        Administrators can click into the row and a modal opens displaying all the answered
        questionnaires for the user.
        • For displaying questions, show the username, questionnaire name, then followed by the
        questions/answers in a “Q: ... A: ...” format.


      STYLE
      GET DATA FROM DB
*/

import { useState } from "react";

// Define types for questionnaire and user data
interface Answer {
  question: string;
  answer: string;
}

interface Questionnaire {
  name: string;
  answers: Answer[];
}

interface User {
  username: string;
  questionnaires: Questionnaire[];
}

const sampleData: User[] = [
  {
    username: "john_doe",
    questionnaires: [
      {
        name: "Survey 1",
        answers: [
          { question: "What is your name?", answer: "John" },
          { question: "What is your age?", answer: "25" }
        ]
      },
      {
        name: "Survey 2",
        answers: [
          { question: "What is your favorite color?", answer: "Blue" },
          { question: "Where do you live?", answer: "NYC" }
        ]
      }
    ]
  },
  {
    username: "jane_doe",
    questionnaires: [
      {
        name: "Survey 3",
        answers: [
          { question: "What is your favorite food?", answer: "Pizza" },
          { question: "What is your hobby?", answer: "Reading" }
        ]
      }
    ]
  }
];

const Admin: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Administrator Dashboard</h1>

      {/* Table displaying usernames and number of questionnaires */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Completed Questionnaires</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(user)}
              >
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.questionnaires.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying user's questionnaires */}
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedUser.username}'s Questionnaires</h2>
            {selectedUser.questionnaires.map((questionnaire, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-xl font-semibold">{questionnaire.name}</h3>
                {questionnaire.answers.map((qa, qIdx) => (
                  <div key={qIdx} className="mt-2">
                    <p className="font-medium">Q: {qa.question}</p>
                    <p className="ml-4 text-gray-600">A: {qa.answer}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

