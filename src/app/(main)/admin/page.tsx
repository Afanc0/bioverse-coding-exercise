"use client"
import NavBar from "@bioverse-intake/components/navbar";
import { useRouter } from "next/navigation";
import React from "react";

import { useGetAllAnswers } from "@bioverse-intake/hooks/get-allanswer";

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

const Admin: React.FC = () => {
  const router = useRouter()

  const { data, error, loading } = useGetAllAnswers()

  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalData, setModalData] = React.useState<any>(null)

  const [questionnaires, setQuestionnaires] = React.useState<any[]>([])

  const handleRowClick = (rowData: any) => {
    setModalData(rowData)
    setQuestionnaires(Object.keys(rowData["questionnaire"]))
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setModalData(null)
  };

  /* Simple Auth */
  const [authLoading, setAuthLoading] = React.useState(true)
  React.useEffect(() => {
    const user = localStorage.getItem("user")
    const level = localStorage.getItem("level")
    if (user === null) {
        router.push('/')
    } else {
      if (level !== "1") {
        router.push('/dashboard')
      } else {
        setAuthLoading(false)
      }
    }
  }, [router])
  if (authLoading) return null

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  console.log(data)

  return (
    <React.Fragment>
      <header>
          <NavBar />
      </header>
      <main>
        <section>
          <div className="flex py-8 px-16 justify-center items-center">
            <div className="w-[800px] flex flex-col gap-4">
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <table className="border-2 border-b-0 flex-1">
                <thead className="border-b-2">
                  <tr className="flex py-2">
                    <th className="px-2 flex-1 justify-start">
                      <span className="text-base">Account Email</span>
                    </th>
                    <th className="px-2 flex-1 justify-start">
                      <span className="text-base">Number of intakes completed</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((value) => (
                    <tr key={value._id} className="flex py-2 border-b-2 cursor-pointer" onClick={() => handleRowClick(value)}>
                      <td className="px-2 flex-1 flex justify-center items-center cur">
                        <span className="text-base font-normal">{value.user}</span>
                      </td>
                      <td className="px-2 flex-1 flex justify-center items-center">
                        <span className="text-base font-normal">{Object.keys(value.questionnaire).length}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex px-4 justify-center items-center">
            <div className="bg-white py-4 rounded shadow-lg w-[600px] max-h-[500px] overflow-y-scroll">
              <div className="border-b-2 pb-4 px-4 flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold">{modalData.user}</h1>
                <button onClick={closeModal}>
                  <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1"
                    viewBox="0 0 460.775 460.775">
                    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
                      c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
                      c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
                      c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
                      l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
                      c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                  </svg>
                </button>
              </div>
              <div className="px-8 py-2 flex flex-col gap-2">
                {questionnaires.map((value) => (
                  <div key={value} className="flex-1 flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{modalData["questionnaire"][value]["name"]} Questionnaire</h1>
                    <div className="flex flex-col gap-2">
                      {Object.entries(modalData["questionnaire"][value])
                      .filter(([key]) => key !== "name") // Exclude the key "name"
                      .map(([key, value]: [string, any], index) => (
                        <div key={index} className="px-4">
                          <h1>Q: {value.question}</h1>
                          <h1>A: {value.answer}</h1>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <footer>
        <div className="flex justify-center items-center py-8">
            <span className="text-gray-600">You are currently logged in as an admin</span>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Admin

